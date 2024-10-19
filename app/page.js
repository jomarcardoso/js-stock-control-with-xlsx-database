'use client';
import { Input } from './components/input';
import { InputNumber } from './components/input-number';
import { useContext, useState } from 'react';
import { SheetsContext } from './providers/sheets.provider';

export default function Home() {
  const [quantity, setQuantity] = useState(0);
  const { values = [] } = useContext(SheetsContext);

  const rows = Array.isArray(values) ? values : [];

  return (
    <div className="px-5">
      <table className="table-auto">
        <thead>
          <tr>
            <th>produto</th>
            <th>quantidade</th>
            <th>fornecedor</th>
            <th>preço</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
