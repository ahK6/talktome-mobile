import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { searchPosts } from '@/store/posts/posts.actions';
import { clearSearchResults } from '@/store/posts/posts.store';
import { ISearchPostsParams } from '@/store/posts/posts.types';
import { useDebouncedCallback } from 'use-debounce';

export const useSearch = () => {
  const dispatch: AppDispatch = useDispatch();
  const { 
    searchResults, 
    searchPagination, 
    searchFilters, 
    searchStatus 
  } = useSelector((state: RootState) => state.posts);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useState<ISearchPostsParams>({
    query: '',
    keywords: [],
    type: 'requesting'
  });

  // Debounced search para evitar muchas peticiones
  const debouncedSearch = useDebouncedCallback(
    (params: ISearchPostsParams) => {
      setCurrentPage(1);
      dispatch(searchPosts({
        inputParams: { ...params, page: 1 },
        shouldStoreOutputState: true
      }));
    },
    300
  );

  // Búsqueda inicial
  const performSearch = useCallback((params: ISearchPostsParams) => {
    setSearchParams(params);
    debouncedSearch(params);
  }, [debouncedSearch]);

  // Cargar más resultados (paginación infinita)
  const loadMoreResults = useCallback(() => {
    if (searchPagination?.hasNextPage && searchStatus !== 'loading') {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      
      dispatch(searchPosts({
        inputParams: { ...searchParams, page: nextPage },
        shouldStoreOutputState: true
      }));
    }
  }, [dispatch, searchParams, currentPage, searchPagination, searchStatus]);

  // Limpiar resultados
  const clearResults = useCallback(() => {
    dispatch(clearSearchResults());
    setCurrentPage(1);
    setSearchParams({
      query: '',
      keywords: [],
      type: 'requesting'
    });
  }, [dispatch]);

  return {
    searchResults,
    searchPagination,
    searchFilters,
    searchStatus,
    currentPage,
    performSearch,
    loadMoreResults,
    clearResults,
    isLoading: searchStatus === 'loading',
    hasMore: searchPagination?.hasNextPage ?? false
  };
};