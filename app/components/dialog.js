'use client';
import { useContext, useEffect } from 'react';
import { EditingContext } from '../providers/editing.provider';
import { ItemForm } from './item-form';

export function Dialog() {
  const { editing, setEditing } = useContext(EditingContext);

  useEffect(() => {
    if (!editing) return;

    const dialog = document.querySelector('dialog');
    dialog.showModal();

    return () => {
      dialog.close();
    };
  }, [editing]);

  return (
    <dialog onClose={() => setEditing(-1)}>
      <ItemForm />
    </dialog>
  );
}
