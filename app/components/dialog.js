'use client';
import { useContext, useEffect, useRef } from 'react';
import { EditingContext } from '../providers/editing.provider';
import { Form } from './item-form';

export function Dialog() {
  const { editing, setEditing } = useContext(EditingContext);
  const ref = useRef();
  const dialog = ref?.current;

  console.log(editing);

  useEffect(() => {
    if (editing) {
      dialog?.showModal();

      return;
    }

    dialog?.close();
  }, [editing]);

  return (
    <dialog ref={ref} onClose={() => setEditing(false)}>
      <Form />
    </dialog>
  );
}
