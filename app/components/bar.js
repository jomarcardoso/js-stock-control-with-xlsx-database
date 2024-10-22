import { type } from 'os';
import { ActionButton } from './action-button';
import Image from 'next/image';

export function Bar({ current, setCurrent }) {
  const hasCurrent = typeof current !== 'number';

  return (
    <div className="fixed bottom-0 left-0 w-full px-5 py-2 border-t-2 border-gray-400 bg-white flex gap-3">
      {!hasCurrent && (
        <>
          <ActionButton>
            ADICIONAR
            <br />
            PRODUTO
          </ActionButton>
          <ActionButton description="ordenado por nome">ORDENAR</ActionButton>
        </>
      )}

      {hasCurrent && (
        <>
          <ActionButton>
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

          <ActionButton color="red">
            REMOVER
            <br />
            PRODUTO
          </ActionButton>

          <ActionButton
            color="red"
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
