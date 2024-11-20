'use client';
import { Bar } from './components/bar';
import { Table } from './components/table';
import { Dialog } from './components/dialog';
import { useContext } from 'react';
import { StockSheetsContext } from './providers/stock-sheets.provider';
import { LogContext } from './providers/log.provider';
import { TabContext } from './providers/tab.provider';
import { Tabs } from './components/tabs';
import { List } from './components/list';

export default function Home() {
  const { sheets } = useContext(StockSheetsContext);
  const { log } = useContext(LogContext);
  const { tab, setTab } = useContext(TabContext);

  return (
    <>
      <div className="mt-4 pb-24">
        <Tabs />

        {tab === 'stock' ? <Table /> : <List />}

        {sheets.length && tab === 'stock' ? <Bar /> : ''}

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
