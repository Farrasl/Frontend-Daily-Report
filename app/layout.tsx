import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import KeycloakProvider from "../components/KeycloakProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reportify KP",
  description:
    "Sistem Informasi Daily Report Kerja Praktik Teknik Informatika Universitas Islam Negeri Sultan Syarif Kasim Riau",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <KeycloakProvider>
          {children}
        </KeycloakProvider>
      </body>
    </html>
  );
}
