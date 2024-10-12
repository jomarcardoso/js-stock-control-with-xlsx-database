'use client';

import { useEffect, useState } from 'react';
import { GoogleLoginContext } from './google-login.context';

// credentials
// https://developers.google.com/workspace/guides/create-credentials

// sheets api
// https://developers.google.com/sheets/api/guides/concepts

// TODO(developer): Set to client ID and API key from the Developer Console
const API_KEY = 'AIzaSyDTpv2UEpHxaftIQXXETkogbHZpeT5C480';
const CLIENT_ID =
  '769211696215-h4sqth8dh20qp8b30noglr80ntcq6it2.apps.googleusercontent.com';
const SPREADSHEET_ID = '1rdJUoPPaAXl7XmhPTVtymMEffrGudJ8yJ5dR90Neh74';
// const spreadSheet = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit?gid=SHEET_ID#gid=SHEET_ID`;

/* exported gapiLoaded */
/* exported gisLoaded */
/* exported handleAuthClick */
/* exported handleSignoutClick */

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  'https://sheets.googleapis.com/$discovery/rest?version=v4';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

let tokenClient;
let gapiInited = false;
let gisInited = false;

// document.getElementById('authorize_button').style.visibility = 'hidden';
// document.getElementById('signout_button').style.visibility = 'hidden';

/**
 * Callback after api.js is loaded.
 */
function gapiLoaded() {
  console.log('gapiLoaded');
  gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC],
  });
  gapiInited = true;
  maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
  console.log('gisLoaded');
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: console.log, // defined later
  });
  gisInited = true;
  maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('authorize_button').style.visibility = 'visible';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
  tokenClient.callback = async (resp) => {
    if (resp.error !== undefined) {
      throw resp;
    }
    document.getElementById('signout_button').style.visibility = 'visible';
    document.getElementById('authorize_button').innerText = 'Refresh';
    await listMajors();
  };

  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    tokenClient.requestAccessToken({ prompt: '' });
  }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    document.getElementById('content').innerText = '';
    document.getElementById('authorize_button').innerText = 'Authorize';
    document.getElementById('signout_button').style.visibility = 'hidden';
  }
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
 */
async function listMajors() {
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
    document.getElementById('content').innerText = 'No values found.';
    return;
  }
  // Flatten to string to display
  const output = range.values.reduce(
    (str, row) => `${str}${row[0]}, ${row[4]}\n`,
    'Name, Major:\n',
  );
  document.getElementById('content').innerText = output;
}

function decodeJwtResponse(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
  // decodeJwtResponse() is a custom function defined by you
  // to decode the credential response.
  const responsePayload = decodeJwtResponse(response.credential);

  console.log(responsePayload);
}

let alreadyLogIn = false;

export function GoogleLogin({ children }) {
  const [user, setUser] = useState();
  const [credential, setCredential] = useState();

  useEffect(() => {
    if (alreadyLogIn) return;

    alreadyLogIn = true;

    // google.accounts.id.initialize({
    //   client_id: CLIENT_ID,
    //   callback: handleCredentialResponse,
    //   context: 'signin',
    //   auto_select: 'true',
    //   cancel_on_tap_outside: false,
    //   itp_support: 'true',
    // });
    // google.accounts.id.prompt();

    setTimeout(() => {
      gapiLoaded();
      gisLoaded();
    }, 4000);
  }, []);

  return (
    <GoogleLoginContext.Provider value={user} credential={credential}>
      <p>Sheets API Quickstart</p>

      {/* Add buttons to initiate auth sequence and sign out */}
      <button
        id="authorize_button"
        style={{ visibility: 'hidden' }}
        onClick={handleAuthClick}
      >
        Authorize
      </button>
      <button
        id="signout_button"
        style={{ visibility: 'hidden' }}
        onClick={handleSignoutClick}
      >
        Sign Out
      </button>

      <pre id="content" style={{ whiteSpace: 'pre-wrap' }}></pre>

      <script
        async
        defer
        src="https://apis.google.com/js/api.js"
        onLoad={gapiLoaded}
      ></script>
      <script
        async
        defer
        src="https://accounts.google.com/gsi/client"
        onLoad={gisLoaded}
      ></script>
      {children}
    </GoogleLoginContext.Provider>
  );
}
