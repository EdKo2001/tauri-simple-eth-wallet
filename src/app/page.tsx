"use client";

import { useState } from "react";

import { LoginScreen, WalletCreation, WalletDashboard } from "@/components";

export default function Home() {
  const [walletCreated, setWalletCreated] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  return userLogged ? (
    <WalletDashboard />
  ) : walletCreated ? (
    <LoginScreen onUserLogged={() => setUserLogged(true)} />
  ) : (
    <WalletCreation onWalletCreated={() => setWalletCreated(true)} />
  );
}
