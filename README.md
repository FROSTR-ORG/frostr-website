# FROSTR

Simple t-of-n remote signing and key rotation protocol for nostr, using the powers of FROST.

This project was hacked together for entry in the TABCONF 2024 hack-a-thon event.

## Key Features

* Break up your secret key into decentralized, distributable shares.

* Sign messages using t-of-n signing devices (multiple devices available).

* If one share is compromised, your secret key is still safe.

* Discard and replace shares without changing your secret key (and identity).

## Architecture

`Bifrost    :` FROSTR cryptography and protocol library.  
`Igloo      :` Desktop key management app & signing device.  
`PermaFrost :` Remote signing server (using express).  
`Frost2x    :` Browser signing extension (forked from nos2x).  

## TODO:

There are a few things that need to be finished before a version 1.0 release:

* Finish refactoring Bifrost library.
* Finish refactoring Igloo application.
* Finish updating PermaFrost and frost2x (once bifrost is ready).
* Other signing methods need to be added (PSBT, ECDH, etc.).
* Add a project kanban board for tracking updates.

The code cleanup is needed in order to graduate this from a hackathon project to a real application.

## How it Works

The protocol uses FROST in order to coordinate the signing of a message between multiple signing devices owned by a single user.

* Website makes a request to the user's signing device (to sign a note).

* User's device signs the note, then broadcasts a partial signature to the remote signing device(s).

* Each remote device verifies the signature and note, then returns their partial signature.

* User's device verifies each partial signature, combines them, and returns the complete signature to the website.

## Setting up your Devices

* Use Igloo to generate a set of FROST shares from your secret key.

* Import a share into Igloo to start the remote signing server.

* Import the remaining shares into your other devices.

* Cold-store the remaining shares for use in recovery.

## Rotating your Shares

* Collect together enough shares to meet your FROST threshold.

* Import the shares into Igloo's recovery page, then click "rotate" to produce a set of new shares.

* Import the new shares into each of your signing devices (including the remote signing server).

## Resources

**Frost**  
Multi-platform Typescript FROST Library   
https://github.com/cmdruid/frost

**BiFrost**  
Core library for implementing the FROSTR signing protocol.  
https://github.com/frost-org/bifrost

**Igloo**  
Electron-based key-management app and remote signing server.  
https://github.com/frost-org/igloo

**Frost2x**  
Web extension signing device (fork of nos2x).  
https://github.com/frost-org/frost2x

**PermaFrost**  
Remote signing server for FROSTR protocol.  
https://github.com/frost-org/permafrost

