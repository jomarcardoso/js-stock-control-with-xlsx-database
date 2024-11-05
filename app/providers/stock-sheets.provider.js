'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleLoginContext } from './google-login.provider';

export const StockSheetsContext = createContext({ values: [] });

const SPREADSHEET_ID = '1medi4MSrVKLXKm6TYT62zFMTftt99D40Nwxv_xB6NTY';

export function StockSheetsProvider({ children }) {
  const user = useContext(GoogleLoginContext);
  const [sheets, setSheets] = useState([]);

  async function getSheets() {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'estoque!A2:E',
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }

    const range = response.result;
    if (!range || !range.values || range.values.length == 0) {
      console.log('No data found.');

      return;
    }

    setSheets(response.result);
  }

  async function updateSheet() {
    try {
      const response = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: 'estoque!A2:E',
        valueInputOption: 'USER_ENTERED',
        resource: { values: sheets.values },
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!user) return;

    getSheets();
  }, [user]);

  return (
    <StockSheetsContext.Provider value={sheets}>
      {children}
    </StockSheetsContext.Provider>
  );
}
