'use client';

import { useCallback, useEffect, useState, createContext } from 'react';

export const GoogleLoginContext = createContext({});

const API_KEY = 'AIzaSyDTpv2UEpHxaftIQXXETkogbHZpeT5C480';
const CLIENT_ID =
  '769211696215-h4sqth8dh20qp8b30noglr80ntcq6it2.apps.googleusercontent.com';

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

  const handleAuthClick = useCallback(() => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }

      setUser(resp);

      document.getElementById('signout_button').style.visibility = 'visible';
      document.getElementById('authorize_button').innerText = 'Refresh';
    };

    if (gapi.client.getToken() === null) {
      // Prompt the user to select a Google Account and ask for consent to share their data
      // when establishing a new session.
      tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      // Skip display of account chooser and consent dialog for an existing session.
      tokenClient.requestAccessToken({ prompt: '' });
    }
  }, []);

  const handleSignoutClick = useCallback(() => {
    const token = gapi.client.getToken();
    if (token !== null) {
      google.accounts.oauth2.revoke(token.access_token);
      gapi.client.setToken('');
      document.getElementById('content').innerText = '';
      document.getElementById('authorize_button').innerText = 'Authorize';
      document.getElementById('signout_button').style.visibility = 'hidden';
    }
  }, []);

  useEffect(() => {
    if (alreadyLogIn) return;

    alreadyLogIn = true;

    setTimeout(() => {
      gapiLoaded();
      gisLoaded();
    }, 4000);
  }, []);

  useEffect(() => {
    if (!user) return;

    localStorage.setItem('login', JSON.stringify(user));
  }, [user, setUser]);

  return (
    <GoogleLoginContext.Provider value={user}>
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
