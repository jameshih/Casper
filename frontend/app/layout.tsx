"use client";
import { Inter } from "next/font/google";

import { WagmiConfig, createConfig, sepolia } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    chains: [sepolia],

    appName: "Casper",

    appDescription: "Casper the Friendly GHO Tipper",
    appUrl: "https://family.co",
    appIcon: "https://family.co/logo.png",
  })
);

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={config}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
