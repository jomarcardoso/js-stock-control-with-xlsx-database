'use client';
import { createContext, useState } from 'react';
import { DEFAULT_STRING_DISPATCH } from '../types';

export const LogContext = createContext({
  log: '',
  setLog: DEFAULT_STRING_DISPATCH,
});

export function LogProvider({ children }) {
  const [log, setLog] = useState('');

  return (
    <LogContext.Provider value={{ log, setLog }}>
      {children}
    </LogContext.Provider>
  );
}
