"use client";

import React, { FC, useState } from "react";
import { generateMnemonic } from "bip39";

import { encryptMnemonic, storeEncryptedMnemonic } from "@/utils";

interface WalletCreationScreenProps {
  onWalletCreated: () => void;
}

const WalletCreationScreen: FC<WalletCreationScreenProps> = ({
  onWalletCreated,
}) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    try {
      // Generate a 12-word mnemonic
      const mnemonic = generateMnemonic();

      // Encrypt the mnemonic with the user's password
      const encryptedMnemonic = encryptMnemonic(mnemonic, password);

      // Store the encrypted mnemonic securely within the application
      await storeEncryptedMnemonic(encryptedMnemonic);

      // Confirm the successful creation of the wallet and redirect the user to the main screen
      onWalletCreated();
      setError("");
      console.log("Wallet created successfully!");
    } catch (error) {
      console.error("Error creating wallet:", error);
      setError("An error occurred while creating the wallet.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">Create Wallet</h1>
        <label className="mb-2 block text-sm font-medium text-gray-600">
          Password:
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-md border p-2"
        />
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <button
          onClick={handleCreateWallet}
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default WalletCreationScreen;
