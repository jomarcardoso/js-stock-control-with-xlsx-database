'use client';
import { useContext, useEffect, useState } from 'react';
import { Input } from './input';
import { InputNumber } from './input-number';
import { Select } from './select';
import { StockSheetsContext } from '../providers/stock-sheets.provider';
import { CurrentContext } from '../providers/current.provider';

/**
 *
 * @param {Object} props
 * @param {Object} props.item
 * @returns
 */
export function ItemForm() {
  const { current } = useContext(CurrentContext);
  const { values = [] } = useContext(StockSheetsContext);
  const rows = Array.isArray(values) ? values : [];
  const initialItem = rows[current] || {};

  useEffect(() => {
    if (!rows.length) return;

    setName(initialItem[0] || '');
    setQuantity(Number(initialItem[1]) || '');
    setSupplier(initialItem[2] || '');
    setPrice(initialItem[3] || '');
  }, [current]);

  const [name, setName] = useState(initialItem[0] || '');
  const [quantity, setQuantity] = useState(Number(initialItem[1]) || '');
  const [supplier, setSupplier] = useState(initialItem[2] || '');
  const [price, setPrice] = useState(initialItem[3] || '');

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      <div className="col-span-2">
        <Input
          id="name"
          label="nome do produto"
          value={name}
          setValue={setName}
        />
      </div>
      <InputNumber
        id="quantity"
        value={quantity}
        setValue={setQuantity}
        label="quantidade"
      />
      <div className="col-span-2">
        <Select
          id="supplier"
          label="fornecedor"
          value={supplier}
          setValue={setSupplier}
        />
      </div>
      <Input id="price" value={price} setValue={setPrice} label="preço" />
    </div>
  );
}
