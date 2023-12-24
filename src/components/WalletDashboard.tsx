"use client";

import React, { useState } from "react";
import { ethers } from "ethers";

interface ExtendedWindow extends Window {
  ethereum?: any;
}

interface EthData {
  address: string;
  Balance: string | null;
}

const WalletDashboard: React.FC = () => {
  const [ethData, setEthData] = useState<EthData>({
    address: "",
    Balance: null,
  });

  const [error, setError] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      // Using the extended Window interface
      const windowWithEthereum = window as ExtendedWindow;

      // Asking if MetaMask is already present or not
      if (windowWithEthereum.ethereum) {
        // Request user permission to connect to MetaMask
        const accounts = await windowWithEthereum.ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = accounts[0];
        setEthData((prevState) => ({ ...prevState, address: account }));

        getBalance(account);
      } else {
        setError("Install MetaMask extension.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setError("Error connecting to wallet. Please try again.");
    }
  };

  const getBalance = async (address: string) => {
    try {
      const windowWithEthereum = window as ExtendedWindow;

      const balance = await windowWithEthereum.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      });

      setEthData((prevState) => ({
        ...prevState,
        Balance: ethers.formatEther(balance),
      }));
    } catch (error) {
      console.error("Error fetching balance:", error);
      setError("Error fetching balance. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">Wallet Dashboard</h1>
        {ethData.Balance !== null ? (
          <h2 className="mb-4">Ethereum Balance: {ethData.Balance} ETH</h2>
        ) : (
          <>
            <button
              onClick={connectWallet}
              className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              Connect to MetaMask
            </button>
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default WalletDashboard;
