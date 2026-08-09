import type { Metadata } from 'next';
import { DM_Sans, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'aguimbao.me',
  description: 'aguimbao.me',
  keywords: [
    'Site Reliability Engineer',
    'SRE',
    'Platform Engineer',
    'Infrastructure',
    'Full-Stack',
    'Back-End',
    'Networking',
    'DevOps',
    'Systems',
    'Cloud',
    'Automation',
    'AI',
    'Web3',
    'GameDev',
    'Cybersec',
  ],
  authors: [{ name: 'aguimbao' }],
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨‍💻</text></svg>',
  },
  openGraph: {
    title: 'aguimbao.me',
    description: 'aguimbao.me',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'aguimbao.me',
    description: 'aguimbao.me',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} bg-background font-sans text-foreground`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
