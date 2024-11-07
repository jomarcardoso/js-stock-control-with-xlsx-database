'use client';
import { useContext } from 'react';
import { StockSheetsContext } from '../providers/stock-sheets.provider';
import { CurrentContext } from '../providers/current.provider';

export function Table() {
  const { current, setCurrent } = useContext(CurrentContext);
  const { sheets } = useContext(StockSheetsContext);
  const rows = Array.isArray(sheets) ? sheets : [];

  return (
    <table className="table-auto w-full">
      <thead className="rounded-lg">
        <tr>
          <th className="th">produto</th>
          <th className="th" style={{ width: '65px' }}>
            quant
          </th>
          <th className="th">fornecedor</th>
          <th className="th" style={{ width: '72px' }}>
            preço
          </th>
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
                onClick={() => current === index && setCurrent(-1)}
                onChange={() => setCurrent(current === index ? -1 : index)}
                checked={current === index}
                key={row[0]}
                name="product"
                value={row[0]}
              />
            </td>
            <td className="td">{row[1]}</td>
            <td className="td">{row[2]}</td>
            <td className="td">{(row[3] || '').replace(',00', '')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
