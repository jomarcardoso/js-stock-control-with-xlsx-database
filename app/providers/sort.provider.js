'use client';
import { createContext, useState } from 'react';
import { DEFAULT_NUMBER_DISPATCH } from '../types';

export const SortContext = createContext({
  sortedColumn: 0,
  setSortedColumn: DEFAULT_NUMBER_DISPATCH,
});

export function SortProvider({ children }) {
  const [sortedColumn, setSortedColumn] = useState(0);

  return (
    <SortContext.Provider value={{ sortedColumn, setSortedColumn }}>
      {children}
    </SortContext.Provider>
  );
}
