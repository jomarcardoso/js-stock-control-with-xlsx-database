'use client';
import { createContext, useState } from 'react';
import { DEFAULT_STRING_DISPATCH } from '../types';

export const FilterContext = createContext({
  filter: '',
  setFilter: DEFAULT_STRING_DISPATCH,
});

export function FilterProvider({ children }) {
  const [filter, setFilter] = useState('');

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}
