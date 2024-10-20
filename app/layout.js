import localFont from 'next/font/local';
import './globals.css';
import './theme.css';
import { GoogleLogin } from './providers/google-login.provider';
import { SheetsProvider } from './providers/sheets.provider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Controle de estoque',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleLogin>
          <SheetsProvider>{children}</SheetsProvider>
        </GoogleLogin>
      </body>
    </html>
  );
}
