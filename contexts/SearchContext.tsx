import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { searchPosts } from '@/store/posts/posts.actions';
import { PostTypes } from '@/store/posts/posts.types';

interface SearchContextType {
  searchQuery: string;
  selectedKeywords: string[];
  isSearchMode: boolean;
  isSearching: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedKeywords: (keywords: string[]) => void;
  toggleKeyword: (keyword: string) => void;
  clearFilters: () => void;
  handleSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Obtener el estado de búsqueda desde Redux
  const { searchStatus } = useSelector((state: RootState) => state.posts);

  // Estado para determinar si estamos en modo búsqueda
  const isSearchMode = searchQuery.trim() !== '' || selectedKeywords.length > 0;

  // Debounced search para evitar muchas peticiones
  const debouncedSearch = useDebouncedCallback(
    async (query: string, keywords: string[]) => {
      if (query.trim() !== '' || keywords.length > 0) {
        setIsSearching(true);
        try {
          await dispatch(searchPosts({
            inputParams: {
              query: query.trim(),
              keywords,
              type: PostTypes.requesting,
              page: 1,
              limit: 20
            },
            shouldStoreOutputState: true
          })).unwrap();
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setIsSearching(false);
        }
      }
    },
    300
  );

  // Función para manejar búsqueda
  const handleSearch = useCallback(() => {
    debouncedSearch(searchQuery, selectedKeywords);
  }, [searchQuery, selectedKeywords, debouncedSearch]);

  // Función para toggle keywords
  const toggleKeyword = useCallback((keywordValue: string) => {
    setSelectedKeywords(prev => {
      const isSelected = prev.includes(keywordValue);
      if (isSelected) {
        return prev.filter(k => k !== keywordValue);
      } else {
        return [...prev, keywordValue];
      }
    });
  }, []);

  // Función para limpiar filtros
  const clearFilters = useCallback(() => {
    setSelectedKeywords([]);
    setSearchQuery('');
    setIsSearching(false);
  }, []);

  const contextValue: SearchContextType = {
    searchQuery,
    selectedKeywords,
    isSearchMode,
    isSearching: isSearching || searchStatus === 'loading',
    setSearchQuery,
    setSelectedKeywords,
    toggleKeyword,
    clearFilters,
    handleSearch
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};