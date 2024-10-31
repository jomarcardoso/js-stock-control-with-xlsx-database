import { useContext } from 'react';
import { StockSheetsContext } from '../providers/stock-sheets.provider';

export function Table() {
  const { values = [] } = useContext(StockSheetsContext);
  const rows = Array.isArray(values) ? values : [];

  return (
    <table className="table-auto">
      <thead className="rounded-lg overflow-hidden">
        <tr>
          <th className="th rounded-tl-lg">produto</th>
          <th className="th">quantidade</th>
          <th className="th">fornecedor</th>
          <th className="th rounded-tr-lg">preço</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            <td className="td">{row[0]}</td>
            <td className="td">{row[1]}</td>
            <td className="td">{row[2]}</td>
            <td className="td">{row[3]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
