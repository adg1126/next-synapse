import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

import { ThemeProvider } from '@/providers/theme-provider';
import { ConvexClientProvider } from '@/providers/convex-provider';
import StoreProvider from '@/providers/store-provider';

import { Toaster } from 'sonner';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Synapse',
  description: 'Generated by create next app',
  icons: {
    icon: [
      {
        rel: 'icon',
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
        href: '/logo.svg',
      },
      {
        rel: 'icon',
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
        href: '/logo-dark.svg',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <head>
        <link
          rel='icon'
          href='/logo-dark.svg'
          sizes='any'
        />
      </head>
      <body
        className={cn(
          'min-h-screen  bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ConvexClientProvider>
          <StoreProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='light'
              disableTransitionOnChange
              storageKey='synapse-theme'
            >
              <Toaster position='bottom-center' />
              {children}
            </ThemeProvider>
          </StoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
