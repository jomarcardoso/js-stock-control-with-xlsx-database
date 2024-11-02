'use client';
import { Input } from './components/input';
import { InputNumber } from './components/input-number';
import { createContext, useContext, useEffect, useState } from 'react';
import { StockSheetsContext } from './providers/stock-sheets.provider';
import { Item } from './components/item';
import { Bar } from './components/bar';
import { ItemForm } from './components/item-form';
import { SupplierSheetsContext } from './providers/supplier-sheets.provider';
import { Table } from './components/table';

const CurrentContext = createContext({});

export default function Home() {
  const [quantity, setQuantity] = useState(0);
  const [current, setCurrent] = useState();
  const [editingItem, setEditingItem] = useState();

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setCurrent(undefined);
    });
  }, []);

  return (
    <CurrentContext.Provider value={{ current, setCurrent }}>
      <div className="px-5 pb-36">
        {/* <ul className="grid gap-2">
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
        </ul> */}

        <Table current={current} setCurrent={setCurrent} />

        <Bar current={current} setCurrent={setCurrent} />

        {/* <ItemForm /> */}
      </div>
    </CurrentContext.Provider>
  );
}
