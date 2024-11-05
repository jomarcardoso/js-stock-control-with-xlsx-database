'use client';
import { createContext, useState } from 'react';
import { DEFAULT_BOOLEAN_DISPATCH } from '../types';

export const EditingContext = createContext({
  editing: false,
  setEditing: DEFAULT_BOOLEAN_DISPATCH,
});

export function EditingItemProvider({ children }) {
  const [editing, setEditing] = useState(false);

  return (
    <EditingContext.Provider value={{ editing, setEditing }}>
      {children}
    </EditingContext.Provider>
  );
}
