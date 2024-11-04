'use client';
import { createContext, useState } from 'react';

export const EditingContext = createContext({
  editing: false,
  setEditing: () => {},
});

export function EditingItemProvider({ children }) {
  const [editing, setEditing] = useState(false);

  return (
    <EditingContext.Provider value={{ editing, setEditing }}>
      {children}
    </EditingContext.Provider>
  );
}
