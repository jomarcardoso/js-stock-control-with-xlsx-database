'use client';
import { useContext, useMemo } from 'react';
import { StockSheetsContext } from '../providers/stock-sheets.provider';
import { CurrentContext } from '../providers/current.provider';
import { SortContext } from '../providers/sort.provider';

export function Table() {
  const { current, setCurrent } = useContext(CurrentContext);
  const { sheets } = useContext(StockSheetsContext);
  const rows = Array.isArray(sheets) ? sheets : [];
  const { sortedColumn, setSortedColumn } = useContext(SortContext);

  const sortedTable = useMemo(() => {
    const newRows = [...rows].map((row, index) => [...row, index]);

    newRows.sort((a, b) => {
      const aValue = a[sortedColumn];
      const bValue = b[sortedColumn];
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });

    return newRows;
  }, [rows, sortedColumn]);

  return (
    <table className="table-auto w-full">
      <thead className="rounded-lg">
        <tr>
          <th className="th" tabIndex={0} onClick={() => setSortedColumn(0)}>
            produto
          </th>
          <th
            className="th"
            tabIndex={0}
            onClick={() => setSortedColumn(1)}
            style={{ width: '65px' }}
          >
            quant
          </th>
          <th className="th" tabIndex={0} onClick={() => setSortedColumn(2)}>
            fornecedor
          </th>
          <th
            className="th"
            tabIndex={0}
            onClick={() => setSortedColumn(3)}
            style={{ width: '72px' }}
          >
            preço
          </th>
        </tr>
      </thead>

      <tbody>
        {sortedTable.length ? (
          sortedTable.map((row, index) => (
            <tr key={index} className="tr relative">
              <td className="td">
                {row[0]}

                <input
                  type="radio"
                  style={{ scale: 'initial' }}
                  className="appearance-none absolute inset-0 border-0 bg-transparent m-0 p-0"
                  onClick={() => current === row[4] && setCurrent(-1)}
                  onChange={() => setCurrent(current === row[4] ? -1 : row[4])}
                  checked={current === row[4]}
                  key={row[0]}
                  name="product"
                  value={row[0]}
                />
              </td>
              <td className="td">{row[1]}</td>
              <td className="td">{row[2]}</td>
              <td className="td">{(row[3] || '').replace(',00', '')}</td>
            </tr>
          ))
        ) : (
          <tr className="tr bg-transparent">
            <td className="td border-none" colSpan={4}>
              <p>Aguardando autorização para carregar dados...</p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
