import { useContext, useState } from 'react';
import { StockSheetsContext } from '../providers/stock-sheets.provider';

export function Table({ current, setCurrent }) {
  const { values = [] } = useContext(StockSheetsContext);
  const rows = Array.isArray(values) ? values : [];

  return (
    <table className="table-auto w-full">
      <thead className="rounded-lg">
        <tr>
          <th className="th">produto</th>
          <th className="th">quant</th>
          <th className="th">fornecedor</th>
          <th className="th w-28">preço</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className="tr relative">
            <td className="td">
              {row[0]}

              <input
                type="radio"
                style={{ scale: 'initial' }}
                className="appearance-none absolute inset-0 border-0 bg-transparent m-0 p-0"
                onClick={() => current === index && setCurrent(undefined)}
                onChange={() =>
                  setCurrent(current === index ? undefined : index)
                }
                checked={current === index}
                key={row[0]}
                name="product"
                value={row[0]}
              />
            </td>
            <td className="td">{row[1]}</td>
            <td className="td">{row[2]}</td>
            <td className="td">{row[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
