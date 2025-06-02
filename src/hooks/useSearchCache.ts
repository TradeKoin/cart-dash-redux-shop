
import { useState, useEffect } from 'react';
import { storage, CACHE_KEYS } from '../utils/storage';

interface SearchHistory {
  term: string;
  timestamp: number;
  results: number;
}

export const useSearchCache = () => {
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  useEffect(() => {
    const history = storage.get<SearchHistory[]>(CACHE_KEYS.SEARCH_HISTORY, []);
    setSearchHistory(history);
  }, []);

  const addToHistory = (term: string, resultsCount: number) => {
    if (!term.trim()) return;

    const newEntry: SearchHistory = {
      term: term.trim(),
      timestamp: Date.now(),
      results: resultsCount,
    };

    const updatedHistory = [
      newEntry,
      ...searchHistory.filter(item => item.term !== term.trim()),
    ].slice(0, 10); // Keep only last 10 searches

    setSearchHistory(updatedHistory);
    storage.set(CACHE_KEYS.SEARCH_HISTORY, updatedHistory);
  };

  const getPopularSearches = () => {
    return searchHistory
      .filter(item => item.results > 0)
      .slice(0, 5)
      .map(item => item.term);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    storage.remove(CACHE_KEYS.SEARCH_HISTORY);
  };

  return {
    searchHistory,
    addToHistory,
    getPopularSearches,
    clearHistory,
  };
};
