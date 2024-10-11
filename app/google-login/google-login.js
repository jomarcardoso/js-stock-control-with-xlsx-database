'use client';

// https://developers.google.com/workspace/guides/create-credentials

const apiKey = 'AIzaSyDTpv2UEpHxaftIQXXETkogbHZpeT5C480';
const client_id =
  '769211696215-h4sqth8dh20qp8b30noglr80ntcq6it2.apps.googleusercontent.com';

import { useEffect, useState } from 'react';
import { GoogleLoginContext } from './google-login.context';

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

    google.accounts.id.initialize({
      client_id,
      callback: handleCredentialResponse,
      context: 'signin',
      auto_select: 'true',
      cancel_on_tap_outside: false,
      itp_support: 'true',
    });
    google.accounts.id.prompt();
  }, []);

  return (
    <GoogleLoginContext.Provider value={user} credential={credential}>
      <script src="https://accounts.google.com/gsi/client"></script>

      {/* <div
        id="g_id_onload"
        data-callback="handleLogin"
        data-client_id="8694241740-u575k043bgd4khpblumlqctilbtrbk57.apps.googleusercontent.com"
        data-context="signin"
        data-auto_select="true"
        data-itp_support="true"
      ></div> */}
      {children}
    </GoogleLoginContext.Provider>
  );
}
