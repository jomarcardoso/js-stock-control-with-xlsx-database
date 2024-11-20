'use client';
import { createContext, useState } from 'react';
import { DEFAULT_STRING_DISPATCH } from '../types';

export const TabContext = createContext({
  tab: '',
  setTab: DEFAULT_STRING_DISPATCH,
});

export function TabProvider({ children }) {
  const [tab, setTab] = useState('stock');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
