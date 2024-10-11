'use client';

import { useEffect } from 'react';

export function GoogleLogin() {
  useEffect(() => {
    console.log('oi');

    const options = {
      client_id:
        '8694241740-u575k043bgd4khpblumlqctilbtrbk57.apps.googleusercontent.com', // required
      auto_select: true, // optional
      cancel_on_tap_outside: false, // optional
      context: 'signin', // optional
    };

    setTimeout(() => {
      google.accounts.id.initialize({
        client_id:
          '8694241740-u575k043bgd4khpblumlqctilbtrbk57.apps.googleusercontent.com',
        callback: console.log,
        context: 'signin',
        auto_select: 'true',
        cancel_on_tap_outside: false,
        itp_support: 'true',
      });
      google.accounts.id.prompt();
    }, 4000);
  }, []);

  return (
    <>
      <script src="https://accounts.google.com/gsi/client" async></script>

      {/* <div
        id="g_id_onload"
        data-callback="console.log"
        data-client_id="8694241740-u575k043bgd4khpblumlqctilbtrbk57.apps.googleusercontent.com"
        data-context="signin"
        data-auto_select="true"
        data-itp_support="true"
      ></div> */}
    </>
  );
}
