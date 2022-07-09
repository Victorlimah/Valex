import Cryptr from "cryptr";
import dotenv from "dotenv";

dotenv.config();

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

export function encryptSecurityCode(password: string) {
  return cryptr.encrypt(password);
}

export function decryptSecurityCode(encryptedSecurityCode: string) {
  return cryptr.decrypt(encryptedSecurityCode);
}
