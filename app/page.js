'use client';
import { Input } from './components/input';
import { InputNumber } from './components/input-number';
import { createContext, useContext, useEffect, useState } from 'react';
import { SheetsContext } from './providers/sheets.provider';
import { Item } from './components/item';
import { Bar } from './components/bar';

const CurrentContext = createContext();

export default function Home() {
  const [quantity, setQuantity] = useState(0);
  const { values = [] } = useContext(SheetsContext);
  const [current, setCurrent] = useState();
  const [editingItem, setEditingItem] = useState();

  const rows = Array.isArray(values) ? values : [];

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setCurrent(undefined);
    });
  }, []);

  return (
    <CurrentContext.Provider value={{ current, setCurrent }}>
      <div className="px-5">
        <ul className="grid gap-3">
          {rows.map((row, index) => (
            <li>
              <Item
                onClick={() => current === index && setCurrent(undefined)}
                onChange={() =>
                  setCurrent(current === index ? undefined : index)
                }
                checked={current === index}
                key={row[0]}
                product={row[0]}
                quantity={row[1]}
                supplier={row[2]}
                price={row[3]}
                name="product"
                value={row[0]}
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

        <Bar current={current} setCurrent={setCurrent} />

        <Input id="product-name" label="nome do produto" />
        <InputNumber
          id="product-quantity"
          label="quantidade"
          value={quantity}
          setValue={setQuantity}
        />
      </div>
    </CurrentContext.Provider>
  );
}
