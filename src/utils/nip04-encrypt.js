/**
 * Browser-compatible NIP-04 encrypt function.
 * Copied from snstr/dist/esm/src/nip04/web.js to bypass Vite's module resolution
 * which keeps loading the Node version despite aliases.
 */
import { hexToBytes, bytesToHex, randomBytes } from "@noble/hashes/utils";
import { secp256k1 } from "@noble/curves/secp256k1";
import CryptoJS from "crypto-js";

/** Base64 encode helper (browser-compatible) */
function base64Encode(bytes) {
    if (typeof globalThis?.btoa === "function") {
        try {
            // Build binary string without spreading large arrays (avoids stack overflow)
            const CHUNK_SIZE = 0x8000; // 32KB chunks
            const parts = [];
            for (let i = 0; i < bytes.length; i += CHUNK_SIZE) {
                const chunk = bytes.subarray(i, i + CHUNK_SIZE);
                let s = "";
                for (let j = 0; j < chunk.length; j++)
                    s += String.fromCharCode(chunk[j]);
                parts.push(s);
            }
            return globalThis.btoa(parts.join(""));
        }
        catch {
            // eslint-disable-next-line no-empty
        }
    }
    if (typeof Buffer !== "undefined") {
        try {
            return Buffer.from(bytes).toString("base64");
        }
        catch {
            // eslint-disable-next-line no-empty
        }
    }
    // Minimal manual base64 (RFC 4648)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let out = "";
    let i = 0;
    while (i < bytes.length) {
        const a = bytes[i++];
        const b = i < bytes.length ? bytes[i++] : 0;
        const c = i < bytes.length ? bytes[i++] : 0;
        const t = (a << 16) | (b << 8) | c;
        out += chars[(t >> 18) & 63] + chars[(t >> 12) & 63];
        out += i - 2 < bytes.length ? chars[(t >> 6) & 63] : "=";
        out += i - 1 < bytes.length ? chars[t & 63] : "=";
    }
    return out;
}

/** Derive ECDH shared secret (raw x-coordinate, 32 bytes) */
export function getSharedSecret(privateKey, publicKey) {
    const sk = hexToBytes(privateKey);
    const pk = hexToBytes("02" + publicKey);
    const shared = secp256k1.getSharedSecret(sk, pk);
    return shared.slice(1, 33);
}

/** Encrypt message per NIP-04, returns "<base64>?iv=<base64>" */
export function encrypt(privateKey, publicKey, message) {
    const keyBytes = getSharedSecret(privateKey, publicKey);
    const iv = randomBytes(16);
    const keyWA = CryptoJS.enc.Hex.parse(bytesToHex(keyBytes));
    const ivWA = CryptoJS.enc.Hex.parse(bytesToHex(iv));
    const plaintextWA = CryptoJS.enc.Utf8.parse(message);
    const encrypted = CryptoJS.AES.encrypt(plaintextWA, keyWA, {
        iv: ivWA,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    // CryptoJS.AES.encrypt(...).ciphertext is a WordArray
    const ciphertextB64 = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    const ivB64 = base64Encode(iv);
    return `${ciphertextB64}?iv=${ivB64}`;
}
