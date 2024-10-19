'use client';
import { Input } from './components/input';
import { InputNumber } from './components/input-number';
import { useContext, useState } from 'react';
import { SheetsContext } from './providers/sheets.provider';
import { Item } from './components/item';

export default function Home() {
  const [quantity, setQuantity] = useState(0);
  const { values = [] } = useContext(SheetsContext);
  const [current, setCurrent] = useState();

  const rows = Array.isArray(values) ? values : [];

  return (
    <div className="px-5">
      <ul className="grid gap-3">
        {rows.map((row, index) => (
          <li>
            <Item
              onClick={() => setCurrent(index)}
              checked={current === index}
              key={index}
              product={row[0]}
              quantity={row[1]}
              supplier={row[2]}
              price={row[3]}
            />
          </li>
        ))}
      </ul>
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
