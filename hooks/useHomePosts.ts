import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { getAllKeywords, getPostsByType } from '@/store/posts/posts.actions';
import { PostTypes } from '@/store/posts/posts.types';
import { showToast } from '@/components/shared/notifications/toast';
import { useSearch } from '@/contexts/SearchContext';

interface IUseHomePostsProps {
  type: PostTypes;
}

export const useHomePosts = ({type}: IUseHomePostsProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { 
    postsRequestingLists, 
    postsRequestingListStatus,
    postsHelpingLists,
    postsHelpingListStatus,
    keywords,
    searchResults,
    searchStatus 
  } = useSelector((state: RootState) => state.posts);

  const {
    searchQuery,
    selectedKeywords,
    isSearchMode,
    isSearching,
    toggleKeyword,
    setType,
    clearFilters,
    handleSearch
  } = useSearch();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Datos a mostrar según el modo
  const displayData = useMemo(() => {
    if (isSearchMode) {
      return searchResults || [];
    }
    
    // Seleccionar datos según el tipo
    if (type === PostTypes.requesting) {
      return postsRequestingLists?.data || [];
    } else if (type === PostTypes.helping) {
      return postsHelpingLists || [];
    }
    
    return [];
  }, [isSearchMode, searchResults, postsRequestingLists?.data, postsHelpingLists, type]);

  const displayStatus = useMemo(() => {
    if (isSearchMode) {
      return searchStatus;
    }
    
    // Seleccionar status según el tipo
    if (type === PostTypes.requesting) {
      return postsRequestingListStatus;
    } else if (type === PostTypes.helping) {
      return postsHelpingListStatus;
    }
    
    return 'idle';
  }, [isSearchMode, searchStatus, postsRequestingListStatus, postsHelpingListStatus, type]);

  // Obtener posts iniciales
  const getPostsRequestingLists = async (type: PostTypes) => {
    const result = await dispatch(
      getPostsByType({
        inputParams: { type, page: currentPage },
        shouldStoreOutputState: true,
      })
    ).unwrap();

    if (result.totalPages && currentPage === 1) {
      setTotalPages(result.totalPages ?? 0);
    }
  };

  const onRefresh = async (type: PostTypes) => {
    setIsRefreshing(true);
    setCurrentPage(1);
    
    try {
      if (isSearchMode) {
        handleSearch();
      } else {
        await dispatch(
          getPostsByType({
            inputParams: { type, page: 1 },
            shouldStoreOutputState: true,
          })
        ).unwrap();
      }
      await dispatch(getAllKeywords({}));
    } catch (error) {
      console.error('Error refreshing data:', error);
      showToast(
        (typeof error === "object" && error !== null && "response" in error && 
          typeof (error as any).response?.data?.error === "string"
          ? (error as any).response.data.error
          : "Error to refresh data"
        ),
        { type: "danger" }
      );
    } finally {
      setIsRefreshing(false);
    }
  };

  const getKeywords = () => {
    dispatch(getAllKeywords({}));
  };

  const handleLoadMore = () => {
    if (!isSearchMode && displayData.length > 0) {
      if (
        displayStatus !== "loading" &&
        displayStatus !== "error" &&
        currentPage < totalPages
      ) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  // Effects
  useEffect(() => {
    if (isSearchMode) {
      handleSearch();
    }
  }, [searchQuery, selectedKeywords, handleSearch, isSearchMode]);

  useEffect(() => {
    if (!isSearchMode) {
      getPostsRequestingLists(type);
    }
    getKeywords();
  }, [type]);

  useEffect(() => {
    if (currentPage > 1 && !isSearchMode) {
      getPostsRequestingLists(type);
    }
  }, [currentPage, type]);

  useEffect(() => {
    setType(type);
  }, [type]);

  return {
    // Data
    displayData,
    displayStatus,
    keywords,
    isRefreshing,
    
    // Search state
    searchQuery,
    selectedKeywords,
    isSearchMode,
    isSearching,
    
    // Actions
    toggleKeyword,
    clearFilters,
    onRefresh,
    handleLoadMore
  };
};