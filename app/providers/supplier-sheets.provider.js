'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleLoginContext } from './google-login.provider';
import { LogContext } from './log.provider';

export const SupplierSheetsContext = createContext({ values: [] });

const SPREADSHEET_ID = '1medi4MSrVKLXKm6TYT62zFMTftt99D40Nwxv_xB6NTY';

export function SupplierSheetsProvider({ children }) {
  const user = useContext(GoogleLoginContext);
  const [sheets, setSheets] = useState([]);
  const { log, setLog } = useContext(LogContext);

  async function getSheets() {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'fornecedores!A2:A',
      });
    } catch (err) {
      // document.getElementById('content').innerText = err.message;
      setLog(
        `${log}
        ${JSON.stringify(err.result.error.message)}`,
      );
      return;
    }

    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      console.log('No data found.');

      return;
    }

    setSheets(response.result);
  }

  useEffect(() => {
    if (!user) return;

    getSheets();
  }, [user]);

  return (
    <SupplierSheetsContext.Provider value={sheets}>
      {children}
    </SupplierSheetsContext.Provider>
  );
}
