"use client";

import React, { FC, useState } from "react";

import { decryptMnemonic } from "@/utils/mnemonic";

import { MnemonicError, UnexpectedError } from "@/types";

interface LoginScreenProps {
  onUserLogged: () => void;
}

const LoginScreen: FC<LoginScreenProps> = ({ onUserLogged }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      // Decrypt the stored mnemonic if the password is correct
      await decryptMnemonic(password);

      // Proceed to the main screen with the decrypted mnemonic
      setError("");
      onUserLogged();
      console.log("Successfully logged in with decrypted mnemonic");
    } catch (error) {
      if (error instanceof MnemonicError) {
        setError(error.message);
      } else if (error instanceof UnexpectedError) {
        setError("An unexpected error occurred. Please try again.");
      } else {
        console.error("Unhandled error:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold">Login</h1>
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
          onClick={handleLogin}
          className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
