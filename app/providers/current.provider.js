'use client';
import { createContext, useEffect, useState } from 'react';
import { DEFAULT_NUMBER_DISPATCH } from '../types';

export const CurrentContext = createContext({
  current: -1,
  setCurrent: DEFAULT_NUMBER_DISPATCH,
});

export function CurrentProvider({ children }) {
  const [current, setCurrent] = useState(-1);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setCurrent(-1);
    });
  }, []);

  return (
    <CurrentContext.Provider value={{ current, setCurrent }}>
      {children}
    </CurrentContext.Provider>
  );
}
