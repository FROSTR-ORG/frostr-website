# FROSTR

Simple t-of-n remote signing and key rotation protocol for nostr, using the powers of FROST.

This project was hacked together for entry in the TABCONF 2024 hack-a-thon event.

## Key Features

* Break up your secret key into decentralized, distributable shares.

* Sign messages using t-of-n signing devices (multiple devices available).

* If one share is compromised, your secret key is still safe.

* Discard and replace shares without changing your secret key (and identity).

[Frostr.org](https://frostr.org)