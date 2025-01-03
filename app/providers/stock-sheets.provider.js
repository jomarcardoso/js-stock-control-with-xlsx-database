'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { GoogleLoginContext } from './google-login.provider';
import { DEFAULT_LIST_DISPATCH } from '../types';
import { LogContext } from './log.provider';

export const StockSheetsContext = createContext({
  sheets: [],
  setSheets: DEFAULT_LIST_DISPATCH,
});

const SPREADSHEET_ID = '1medi4MSrVKLXKm6TYT62zFMTftt99D40Nwxv_xB6NTY';

export function StockSheetsProvider({ children }) {
  const fetched = useRef(false);
  const user = useContext(GoogleLoginContext);
  const [sheets, setSheets] = useState([]);
  const { log, setLog } = useContext(LogContext);

  async function getSheets() {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'estoque!A2:E',
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

    setSheets(response.result.values || []);
    setTimeout(() => {
      fetched.current = true;
    }, 100);
  }

  async function updateSheet() {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'estoque!A2:E',
        valueInputOption: 'USER_ENTERED',
        resource: { values: sheets },
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!fetched.current) return;

    updateSheet();
  }, [sheets]);

  useEffect(() => {
    if (!user) return;

    getSheets();
  }, [user]);

  return (
    <StockSheetsContext.Provider value={{ sheets, setSheets }}>
      {children}
    </StockSheetsContext.Provider>
  );
}
