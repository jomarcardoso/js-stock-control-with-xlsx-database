'use client';
import { useContext, useEffect } from 'react';
import { EditingItemContext } from '../providers/editing-item.provider';
import { ItemForm } from './item-form';

export function Dialog() {
  const [index, setIndex] = useContext(EditingItemContext);

  useEffect(() => {
    if (index === undefined) return;

    const dialog = document.querySelector('dialog');
    dialog.showModal();

    return () => {
      dialog.close();
    };
  }, [index]);

  return (
    <dialog>
      <ItemForm />
    </dialog>
  );
}
