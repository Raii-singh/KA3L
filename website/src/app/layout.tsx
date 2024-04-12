import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/ui/Nav';
import FooterWrapper from '@/components/ui/FooterWrapper';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'KA3L — Open Machine Architecture',
  description:
    'KA3L is an open architecture for machine-native computing. Every compatible machine runs a native agent that understands its own hardware, software, files, and state — exposing its functions through a unified capability layer, governed by identity and policy.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ background: 'var(--bg-deep)', color: 'var(--text-primary)' }}
        suppressHydrationWarning
      >
        <Nav />
        <main>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}

// dev: revision 007 verified
