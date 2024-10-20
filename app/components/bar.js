import { ActionButton } from './action-button';

export function Bar() {
  return (
    <div className="fixed bottom-0 left-0 w-full px-5 py-2 border-t-2 border-gray-400 bg-white flex gap-3">
      <ActionButton>
        ADICIONAR
        <br />
        PRODUTO
      </ActionButton>

      <ActionButton>
        EDITAR
        <br />
        PRODUTO
        <img src="pencil.png" alt="edit" className="w-6 h-6" />
      </ActionButton>

      <ActionButton description="ordenado por nome">ORDENAR</ActionButton>
      <ActionButton color="red">
        REMOVER
        <br />
        PRODUTO
      </ActionButton>
    </div>
  );
}
