'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { GoogleLoginContext } from './google-login.provider';

export const SheetsContext = createContext({});

const SPREADSHEET_ID = '1rdJUoPPaAXl7XmhPTVtymMEffrGudJ8yJ5dR90Neh74';

export function SheetsProvider({ children }) {
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

  useEffect(() => {
    if (!user) return;

    getSheets();
  }, [user]);

  return (
    <SheetsContext.Provider value={sheets}>{children}</SheetsContext.Provider>
  );
}
