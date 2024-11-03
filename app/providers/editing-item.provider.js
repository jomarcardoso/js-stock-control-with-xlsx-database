'use client';
import { createContext, useState } from 'react';

/** @type {number|undefined} */
const initialValue = undefined;

export const EditingItemContext = createContext([initialValue, () => {}]);

export function EditingItemProvider({ children }) {
  const [index, setIndex] = useState(initialValue);

  return (
    <EditingItemContext.Provider value={[index, setIndex]}>
      {children}
    </EditingItemContext.Provider>
  );
}
