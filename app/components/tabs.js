'use client';
import { useCallback, useContext } from 'react';
import { TabContext } from '../providers/tab.provider';

export function Tabs() {
  const { tab, setTab } = useContext(TabContext);

  const handleChange = useCallback(
    (event) => {
      setTab(event.target.value);
    },
    [setTab],
  );

  return (
    <fieldset className="m-0 mb-2">
      <legend className="font-bold">tabelas</legend>
      <div className="flex gap-2">
        <label>
          <input
            type="radio"
            name="table"
            value="stock"
            checked={tab === 'stock'}
            onChange={handleChange}
          />
          estoque
        </label>
        <label>
          <input
            type="radio"
            name="table"
            value="supplier"
            checked={tab === 'supplier'}
            onChange={handleChange}
          />
          fornecedores
        </label>
      </div>
    </fieldset>
  );
}
