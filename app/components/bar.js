'use client';
import { ActionButton } from './action-button';
import { useContext } from 'react';
import { EditingContext } from '../providers/editing.provider';
import { CurrentContext } from '../providers/current.provider';
import { StockSheetsContext } from '../providers/stock-sheets.provider';

export function Bar() {
  const { current, setCurrent } = useContext(CurrentContext);
  const hasCurrent = current !== -1;
  const { setEditing } = useContext(EditingContext);
  const { sheets, setSheets } = useContext(StockSheetsContext);

  const handleRemove = () => {
    const newSheets = [...sheets];
    newSheets.splice(current, 1);
    setSheets(newSheets);
    setCurrent(-1);
  };

  const handleAdd = () => {
    const newSheets = [...sheets];
    newSheets.push(['', '', '', '']);
    setSheets(newSheets);
    setCurrent(newSheets.length - 1);
    setEditing(true);
  };

  return (
    <div className="bar fixed bottom-0 left-0 w-full px-5 py-2 border-t-2 flex gap-2">
      {!hasCurrent && (
        <>
          <ActionButton type="submit" onClick={handleAdd}>
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
          <ActionButton type="submit" onClick={() => setEditing(true)}>
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

          <ActionButton onClick={handleRemove}>
            REMOVER
            <br />
            PRODUTO
          </ActionButton>

          <ActionButton
            onClick={() => {
              setCurrent(-1);
            }}
          >
            CANCELAR
          </ActionButton>
        </>
      )}
    </div>
  );
}
