'use client';
import { Bar } from './components/bar';
import { Table } from './components/table';
import { Dialog } from './components/dialog';
import { useContext } from 'react';
import { StockSheetsContext } from './providers/stock-sheets.provider';
import { LogContext } from './providers/log.provider';

export default function Home() {
  const { sheets } = useContext(StockSheetsContext);
  const { log } = useContext(LogContext);

  return (
    <>
      <div className="mt-4 pb-24">
        <Table />

        {sheets.length ? <Bar /> : ''}

        {log ? (
          <details>
            <summary>Log</summary>
            <blockquote>{log}</blockquote>
          </details>
        ) : (
          ''
        )}
      </div>
      <Dialog />
    </>
  );
}
