import './globals.css';
import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

// Authentication
// import { ClerkProvider } from '@clerk/nextjs';

// Providers
import { ToastProvider } from '@/components/providers/toaster-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';
import { ThemeProvider } from '@/components/theme-provider';
const inter = Inter({ subsets: ['latin'] });
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export const metadata: Metadata = {
  title: 'pioneer',
  description: 'Making online teaching easy',
  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <ConfettiProvider />
          <ToastProvider />
          {children}
          </ThemeProvider>
        </body>
      </html>
    // </ClerkProvider>
  );
}
