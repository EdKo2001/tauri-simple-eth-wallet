import { readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import { AES, enc } from "crypto-js";


import { MnemonicError, UnexpectedError } from "@/types";

// const filePath = process.env.ENCRYPTED_MNEMONIC_FILE_PATH;
const filePath = "encrypted-mnemonic.txt";

export const storeEncryptedMnemonic = async (encryptedMnemonic: string) => {
  try {
    await writeTextFile(filePath, encryptedMnemonic);

    console.log("Encrypted mnemonic stored successfully.");
  } catch (error) {
    console.error("Error storing encrypted mnemonic:", error);
    throw new Error("Failed to store encrypted mnemonic");
  }
};

export const encryptMnemonic = (mnemonic: string, password: string): string => {
  try {
    if (!mnemonic || !password) {
      throw new Error("Mnemonic and password are required for encryption");
    }

    const encrypted = AES.encrypt(mnemonic, password).toString();

    return encrypted;
  } catch (error) {
    console.error("Error encrypting mnemonic:", error);
    throw new Error("Failed to encrypt mnemonic");
  }
};

export const decryptMnemonic = async (
  password: string,
): Promise<string | null> => {
  try {
    const encryptedMnemonic = await getEncryptedMnemonic();

    if (encryptedMnemonic !== null) {
      const decryptedMnemonic = AES.decrypt(
        encryptedMnemonic,
        password,
      ).toString(enc.Utf8);

      if (!decryptedMnemonic) {
        throw new Error("Password isn't correct");
      }

      return decryptedMnemonic;
    } else {
      throw new Error("Encrypted mnemonic not found");
    }
  } catch (error) {
    if (error instanceof MnemonicError) {
      throw error;
    } else {
      console.error("Error decrypting mnemonic:", error);
      throw new UnexpectedError("An unexpected error occurred");
    }
  }
};

export const getEncryptedMnemonic = async (): Promise<string | null> => {
  try {
    return await readTextFile(filePath);
  } catch (error) {
    console.error("Error reading encrypted mnemonic:", error);
    throw new Error("Failed to reading encrypted mnemonic");
  }
};
