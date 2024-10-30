'use client';
import { Input } from './components/input';
import { InputNumber } from './components/input-number';
import { createContext, useContext, useEffect, useState } from 'react';
import { StockSheetsContext } from './providers/stock-sheets.provider';
import { Item } from './components/item';
import { Bar } from './components/bar';
import { ItemForm } from './components/item-form';
import { SupplierSheetsContext } from './providers/supplier-sheets.provider';

const CurrentContext = createContext();

export default function Home() {
  const [quantity, setQuantity] = useState(0);
  const { values = [] } = useContext(StockSheetsContext);
  const [current, setCurrent] = useState();
  const [editingItem, setEditingItem] = useState();
  const { values: suppliers = [] } = useContext(SupplierSheetsContext);

  console.log(suppliers);

  const rows = Array.isArray(values) ? values : [];

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setCurrent(undefined);
    });
  }, []);

  return (
    <CurrentContext.Provider value={{ current, setCurrent }}>
      <div className="px-5 pb-36">
        <ul className="grid gap-2">
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

        <ItemForm />
      </div>
    </CurrentContext.Provider>
  );
}
