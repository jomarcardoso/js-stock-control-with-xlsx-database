import { type } from 'os';
import { ActionButton } from './action-button';
import Image from 'next/image';
import { useContext } from 'react';
import { EditingItemContext } from '../providers/editing-item.provider';

export function Bar({ current, setCurrent }) {
  const hasCurrent = typeof current === 'number';
  const [editingItem, setEditingItem] = useContext(EditingItemContext);

  return (
    <div className="bar fixed bottom-0 left-0 w-full px-5 py-2 border-t-2 flex gap-2">
      {!hasCurrent && (
        <>
          <ActionButton type="submit">
            ADICIONAR
            <br />
            PRODUTO
          </ActionButton>
          <ActionButton type="submit" description="ordenado por nome">
            ORDENAR
          </ActionButton>
        </>
      )}

      {hasCurrent && (
        <>
          <ActionButton type="submit" onClick={() => setEditingItem(current)}>
            EDITAR
            <br />
            PRODUTO
            {/* <Image
              src="/assets/pencil.png"
              alt="edit"
              width={20}
              height={20}
              className="inline ml-2"
            /> */}
          </ActionButton>

          <ActionButton>
            REMOVER
            <br />
            PRODUTO
          </ActionButton>

          <ActionButton
            onClick={() => {
              setCurrent(null);
            }}
          >
            CANCELAR
          </ActionButton>
        </>
      )}
    </div>
  );
}
