'use client';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Input } from './input';
import { InputNumber } from './input-number';
import { Select } from './select';
import { StockSheetsContext } from '../providers/stock-sheets.provider';
import { CurrentContext } from '../providers/current.provider';
import { EditingContext } from '../providers/editing.provider';

function unformatPrice(price = '') {
  return (price || '')
    .replace(',00', '')
    .replace('.', '')
    .replace(/[^\d.-]/g, '')
    .trim();
}

/**
 *
 * @param {Object} props
 * @param {Object} props.item
 * @returns
 */
export function Form() {
  const { setEditing } = useContext(EditingContext);
  const { current } = useContext(CurrentContext);
  const { sheets, setSheets } = useContext(StockSheetsContext);
  const rows = Array.isArray(sheets) ? sheets : [];
  const initialItem = rows[current] || {};

  const [name, setName] = useState(initialItem[0] || '');
  const [quantity, setQuantity] = useState(Number(initialItem[1]) || '');
  const [supplier, setSupplier] = useState(initialItem[2] || '');
  const [price, setPrice] = useState(unformatPrice(initialItem[3]));

  useEffect(() => {
    if (!rows.length) return;

    setName(initialItem[0] || '');
    setQuantity(Number(initialItem[1]) || '');
    setSupplier(initialItem[2] || '');
    setPrice(unformatPrice(initialItem[3]));
  }, [initialItem]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const brl = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const newLines = rows.map((row, index) => {
        if (index !== current) return row;

        return [
          name,
          String(quantity),
          supplier,
          brl.format(Number(unformatPrice(price))),
        ];
      });

      setSheets(newLines);
      setEditing(false);
    },
    [current, rows, name, quantity, supplier, price, setSheets, setEditing],
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-3 md:col-span-2">
          <Input
            id="name"
            label="nome do produto"
            value={name}
            setValue={setName}
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <InputNumber
            id="quantity"
            value={quantity}
            setValue={setQuantity}
            label="quantidade"
          />
        </div>
        <div className="col-span-3 md:col-span-2">
          <Select
            id="supplier"
            label="fornecedor"
            value={supplier}
            setValue={setSupplier}
          />
        </div>
        <div className="col-span-3 md:col-span-1">
          <Input id="price" value={price} setValue={setPrice} label="preço" />
        </div>
      </div>

      <footer className="flex justify-end gap-2 mt-2">
        <button type="button" onClick={() => setEditing(false)}>
          cancelar
        </button>

        <button type="submit">salvar</button>
      </footer>
    </form>
  );
}
