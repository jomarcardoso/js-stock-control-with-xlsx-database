'use client';

import { useState } from 'react';
import { Input } from './input';
import { InputNumber } from './input-number';
import { Select } from './select';

/**
 *
 * @param {Object} props
 * @param {Object} props.item
 * @returns
 */
export function ItemForm({ item: initialItem = {} }) {
  const [name, setName] = useState(initialItem.name || '');
  const [quantity, setQuantity] = useState(initialItem.quantity || '');
  const [price, setPrice] = useState(initialItem.price || '');
  const [supplier, setSupplier] = useState(initialItem.supplier || '');

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2">
        <Input label="nome do produto" />
      </div>
      <InputNumber value={quantity} setValue={setQuantity} label="quantidade" />
      <div className="col-span-2">
        <Select label="fornecedor" />
      </div>
      <Input value={price} setValue={setPrice} label="preço" />
    </div>
  );
}
