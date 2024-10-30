'use client';

import { useCallback, useEffect, useState, createContext, useRef } from 'react';

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

// document.getElementById('authorize_button').style.visibility = 'hidden';
// document.getElementById('signout_button').style.visibility = 'hidden';

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
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const gapiRef = useRef();
  const gisRef = useRef();

  /**
   * Callback after Google Identity Services are loaded.
   */
  const gisLoaded = useCallback(() => {
    tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: console.log, // defined later
    });
    setGisInited(true);
    maybeEnableButtons();
  }, []);

  const getSessionToken = useCallback(() => {
    const jsonToken = localStorage.getItem('token');

    if (jsonToken) {
      const token = JSON.parse(jsonToken);

      gapi.client.setToken(token);
      setUser(token);
    }
  }, []);

  /**
   * Callback after the API client is loaded. Loads the
   * discovery doc to initialize the API.
   */
  const initializeGapiClient = useCallback(async () => {
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiInited(true);
    maybeEnableButtons();
    getSessionToken();
  }, []);

  /**
   * Enables user interaction after all libraries are loaded.
   */
  function maybeEnableButtons() {
    if (gapiInited && gisInited) {
      document.getElementById('authorize_button').style.visibility = 'visible';
    }
  }

  /**
   * Callback after api.js is loaded.
   */
  const gapiLoaded = useCallback(() => {
    console.log('gapiLoaded');
    gapi.load('client', initializeGapiClient);
  }, []);

  const handleAuthClick = useCallback(() => {
    tokenClient.callback = async (resp) => {
      if (resp.error !== undefined) {
        throw resp;
      }

      setUser(resp);
      localStorage.setItem('token', JSON.stringify(gapi.client.getToken()));

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

  const insertScripts = useCallback(() => {
    const gapiScript = document.createElement('script');
    const gisScript = document.createElement('script');

    gapiScript.src = 'https://apis.google.com/js/api.js';
    gisScript.src = 'https://accounts.google.com/gsi/client';

    gapiScript.onload = gapiLoaded;
    gisScript.onload = gisLoaded;

    document.body.appendChild(gapiScript);
    document.body.appendChild(gisScript);
  }, []);

  useEffect(() => {
    if (alreadyLogIn) return;

    alreadyLogIn = true;

    insertScripts();
  }, []);

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
      {children}
    </GoogleLoginContext.Provider>
  );
}
