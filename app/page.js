'use client';
import Image from 'next/image';
import { Input } from './components/input';
import { InputNumber } from './components/input-number';
import { useState } from 'react';

export default function Home() {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="px-5">
      <Input id="product-name" label="nome do produto" />
      <InputNumber
        id="product-quantity"
        label="quantidade"
        value={quantity}
        setValue={setQuantity}
      />
    </div>
  );
}
