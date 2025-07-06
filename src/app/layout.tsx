import type { Metadata } from "next";
import { Geist, Poppins } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700"],
   variable: "--font-poppins",
 });


export const metadata: Metadata = {
  title: "Pré-IFMA",
  description: "O seu preparatório para ingressar no IFMA",
  keywords: ['preifma', 'preparatorio pre-ifma', 'preparatorio ifma', 'pre-ifma']
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} ${geistSans.variable} antialiased`}>
         <Toaster position="top-center" />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
