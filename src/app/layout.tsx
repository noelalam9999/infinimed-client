'use client';
// import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import ReduxProvider from '@/lib/redux-provider';
import BottomNavbar from '@/components/BottomNavbar';
import AuthProvider from '@/Providers/AuthProvider';
import { store } from '@/lib/store';
import { Provider } from 'react-redux';
// import { store } from '@/lib/store';
// import { Provider } from 'react-redux';

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

// export const metadata: Metadata = {
//   title: 'Infinimed',
//   description: 'Home Medic Services',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar ">
      <body
        style={{ overflow: 'overlay' }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflow-scroll`}
      >
        <ReduxProvider>
          <Provider store={store}>
            <AuthProvider>
              <Theme accentColor="ruby" panelBackground="solid">
                <div className="">
                  {children}
                  <BottomNavbar></BottomNavbar>
                </div>
              </Theme>
            </AuthProvider>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
