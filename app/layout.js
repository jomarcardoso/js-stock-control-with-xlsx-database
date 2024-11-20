import localFont from 'next/font/local';
import './globals.css';
import './theme.css';
import { GoogleLogin } from './providers/google-login.provider';
import { StockSheetsProvider } from './providers/stock-sheets.provider';
import { SupplierSheetsProvider } from './providers/supplier-sheets.provider';
import { EditingProvider } from './providers/editing.provider';
import { CurrentProvider } from './providers/current.provider';
import { SortProvider } from './providers/sort.provider';
import { LogProvider } from './providers/log.provider';
import { FilterProvider } from './providers/filter.provider';
import { TabProvider } from './providers/tab.provider';

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
        <h1>Controle de estoque</h1>

        <p>
          Para iniciar pressione o botão abaixo e autorize o acesso aos dados da
          planilha.
        </p>
        <LogProvider>
          <GoogleLogin>
            <SupplierSheetsProvider>
              <CurrentProvider>
                <TabProvider>
                  <EditingProvider>
                    <SortProvider>
                      <FilterProvider>
                        <StockSheetsProvider>{children}</StockSheetsProvider>
                      </FilterProvider>
                    </SortProvider>
                  </EditingProvider>
                </TabProvider>
              </CurrentProvider>
            </SupplierSheetsProvider>
          </GoogleLogin>
        </LogProvider>
      </body>
    </html>
  );
}
