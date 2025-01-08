import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "@next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Providers from './providers'; 
import { Toaster } from "@/components/ui/toaster";
import {ClerkProvider} from '@clerk/nextjs';



// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "nextjs store",
  description: "created with NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <ClerkProvider>
      <html lang="en">
        <body>
          <Toaster />
          <Providers>
            <Navbar />
            <Container className="">
              {children}
            </Container>
          </Providers>
        </body>
      </html>
  // </ClerkProvider>
  );
}