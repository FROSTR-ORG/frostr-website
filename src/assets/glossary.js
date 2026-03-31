/**
 * @typedef {Object} GlossaryMeta
 * @property {string} intro
 * @property {string} note
 */

/**
 * @typedef {Object} GlossaryEntry
 * @property {string} id
 * @property {string} term
 * @property {string[]} [aliases]
 * @property {string} description
 */

/**
 * @typedef {Object} GlossarySection
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {GlossaryEntry[]} entries
 */

/** @type {GlossaryMeta} */
export const glossaryMeta = {
  intro:
    'FROSTR lets one Nostr private key be split across multiple cooperating shares. If you only remember three ideas, remember this: a keyset is the full setup, a share is one piece of it, and the threshold is how many pieces are needed.',
  note:
    'This page focuses on the core terms used across all of the V1 apps, including desktop, server, web, mobile, CLI, and extension-based FROSTR flows.'
};

/** @type {GlossarySection[]} */
export const glossarySections = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    description: 'Start here if you are new to how FROSTR works at a high level.',
    entries: [
      {
        id: 'frostr',
        term: 'FROSTR',
        description:
          'FROSTR is a way to control one Nostr identity with multiple cooperating signers instead of one device holding the whole secret.'
      },
      {
        id: 'frost',
        term: 'FROST',
        description:
          'FROST is the threshold Schnorr signing method underneath FROSTR. It is what lets a group of shares produce one valid signature together.'
      },
      {
        id: 'threshold',
        term: 'Threshold',
        description:
          'The threshold is the minimum number of shares needed to act. In a 2-of-3 setup, the threshold is 2.'
      },
      {
        id: 'group',
        term: 'Group',
        description:
          'A group is the set of related members in one FROSTR setup. It defines which shares belong together and who can cooperate.'
      },
      {
        id: 'keyset',
        term: 'Keyset',
        description:
          'A keyset is the full distributed setup created from one private key. It includes the group data and the shares generated from that key.'
      },
      {
        id: 'share',
        term: 'Share',
        description:
          'A share is one piece of a keyset. One share alone is not enough to sign or recover the original secret.'
      }
    ]
  },
  {
    id: 'identity-and-credentials',
    title: 'Identity And Credentials',
    description: 'These are the keys, labels, and packaged values users see in the apps.',
    entries: [
      {
        id: 'nsec',
        term: '`nsec`',
        description:
          '`nsec` is your Nostr private key. FROSTR protects it by splitting it into shares instead of leaving it in one place.'
      },
      {
        id: 'npub',
        term: '`npub`',
        description:
          '`npub` is your public Nostr identity. Your `npub` stays the same even when the private key is managed through FROSTR shares.'
      },
      {
        id: 'group-credential',
        term: 'Group credential',
        aliases: ['`bfgroup...`'],
        description:
          'The group credential is the package that describes the group-level data for a keyset. Apps use it to understand the threshold and which shares belong together.'
      },
      {
        id: 'share-credential',
        term: 'Share credential',
        aliases: ['`bfshare...`'],
        description:
          'The share credential is the package that carries one signer share. It is what you load into a signer or save on a device.'
      },
      {
        id: 'keyset-name',
        term: 'Keyset name',
        aliases: ['Group name'],
        description:
          'A keyset name is the label a user gives to a set of shares. It helps you tell one keyset or group apart from another in the apps.'
      },
      {
        id: 'secure-storage',
        term: 'Secure storage',
        description:
          'Secure storage is the place an app uses to keep saved credentials on a device as safely as it can. On mobile this usually means platform-protected storage, while web flows encrypt the saved bundle before keeping it locally.'
      }
    ]
  },
  {
    id: 'nodes-and-network',
    title: 'Nodes And Network',
    description: 'These terms cover how signers find each other and stay connected.',
    entries: [
      {
        id: 'node',
        term: 'Node',
        description:
          'A node is one running member of a FROSTR group. A desktop app, server, or other signer can act as a node when it is online and participating.'
      },
      {
        id: 'peer',
        term: 'Peer',
        description:
          'A peer is another node in the same group. Peers cooperate with each other during signing and other network actions.'
      },
      {
        id: 'relay',
        term: 'Relay',
        description:
          'A relay is the server used to pass encrypted messages between signers. It is the communication layer, not the secret storage layer.'
      },
      {
        id: 'relay-settings',
        term: 'Relay settings',
        description:
          'Relay settings are the relay URLs an app or signer uses to communicate with the rest of the group. Matching relay settings matter because peers need a shared path to find each other.'
      },
      {
        id: 'ping',
        term: 'Ping',
        description:
          'Ping is a quick connectivity check between nodes or peers. It helps show whether another signer looks reachable before you rely on it.'
      },
      {
        id: 'echo',
        term: 'Echo',
        description:
          'Echo is the confirmation flow used when one device needs proof that another device received a share or related message. It is mainly about delivery and confirmation, not signing.'
      },
      {
        id: 'signer-status',
        term: 'Signer status',
        description:
          'Signer status is the app view of whether a signer looks online, connected, or ready. It helps users tell if a node seems available before relying on it.'
      },
      {
        id: 'peer-visibility',
        term: 'Peer visibility',
        description:
          'Peer visibility means seeing which other members of the group appear reachable or active. Mobile, web, and desktop signers surface this so users can understand the health of the group.'
      }
    ]
  },
  {
    id: 'share-management',
    title: 'Share Management',
    description: 'These are the main setup and maintenance actions users take around shares and keysets.',
    entries: [
      {
        id: 'create-keyset',
        term: 'Create keyset',
        description:
          'Create keyset is the flow where you generate or import an `nsec` and split it into a new set of shares. This is where you choose the threshold and total shares.'
      },
      {
        id: 'add-share',
        term: 'Add share',
        description:
          'Add share is the flow for importing an existing share onto a device or app. It lets a signer join an existing keyset instead of creating a new one.'
      },
      {
        id: 'load-share',
        term: 'Load share',
        description:
          'Load share is the step where a saved share is opened so the signer can actually use it. A share can be stored on a device without always being actively loaded.'
      },
      {
        id: 'unlock',
        term: 'Unlock',
        description:
          'Unlock is the flow for reopening saved encrypted credentials so the app can use them again. Web and mobile signers often ask for a password or device protection step before unlocking.'
      },
      {
        id: 'qr-onboarding',
        term: 'QR onboarding',
        description:
          'QR onboarding is the setup flow where credentials are imported by scanning a QR code instead of typing them manually. It is a faster way to join a device to an existing keyset.'
      },
      {
        id: 'qr-share-transfer',
        term: 'QR share transfer',
        description:
          'QR share transfer is the device-to-device flow for moving a share by scanning a QR code. It makes share setup easier than manually copying long credentials.'
      },
      {
        id: 'recovery',
        term: 'Recovery',
        description:
          'Recovery is the process of rebuilding the original `nsec` from enough valid shares. You use it when you intentionally need the raw secret again.'
      },
      {
        id: 'key-rotation',
        term: 'Key rotation',
        description:
          'Key rotation means replacing an old set of shares with a fresh new set. You do this if a share is lost, exposed, or you want a different threshold setup.'
      }
    ]
  },
  {
    id: 'signing-flow',
    title: 'Signing Flow',
    description: 'These terms describe the actual signing process users see in the apps.',
    entries: [
      {
        id: 'signer',
        term: 'Signer',
        description:
          'A signer is the app or service currently holding one share and participating in requests. Igloo Desktop and Igloo Server can both act as signers.'
      },
      {
        id: 'remote-signing',
        term: 'Remote signing',
        description:
          'Remote signing means one app asks another signer to help complete a signature over the network. This lets shares live on different devices or services.'
      },
      {
        id: 'signing-request',
        term: 'Signing request',
        aliases: ['Remote signing request'],
        description:
          'A signing request is the message sent to a signer asking it to approve or help complete a signature. It is the basic unit of the remote signing flow.'
      },
      {
        id: 'event-log',
        term: 'Event log',
        description:
          'The event log is the running record of requests, responses, and signer state changes. It helps you see what the app or server is doing during a session.'
      },
      {
        id: 'soundscape-mode',
        term: 'Soundscape mode',
        description:
          'Soundscape mode is the iOS-specific feature that helps keep the signer reachable while the app is in the background. It is the user-facing way Igloo iOS can stay available for signing without remaining open on screen.'
      }
    ]
  },
  {
    id: 'app-integrations',
    title: 'App Integrations',
    description: 'These terms describe how FROSTR signers plug into browsers, apps, and external clients.',
    entries: [
      {
        id: 'browser-extension',
        term: 'Browser extension',
        description:
          'A browser extension is a signer that runs inside the browser as an installed extension. Frost2x is the V1 browser-extension signer in the FROSTR stack.'
      },
      {
        id: 'nip-07',
        term: 'NIP-07',
        description:
          'NIP-07 is the browser signing interface many Nostr websites already support. Frost2x keeps that familiar extension flow while using FROSTR signing underneath.'
      },
      {
        id: 'nip-55',
        term: 'NIP-55',
        description:
          'NIP-55 is the signing flow used by Igloo Android to handle requests from other Nostr apps on the device. It is the mobile-app integration side of the V1 stack.'
      },
      {
        id: 'nostrsigner-uri',
        term: '`nostrsigner:` link',
        description:
          'A `nostrsigner:` link is the kind of signing request Igloo Android can open from another app. It is the handoff format used in that NIP-55 flow.'
      }
    ]
  },
  {
    id: 'rules-and-permissions',
    title: 'Rules And Permissions',
    description: 'These terms cover how access gets narrowed and approved for clients and signers.',
    entries: [
      {
        id: 'policy',
        term: 'Policy',
        description:
          'A policy is a rule about what a signer, node, or session is allowed to do. Policies are used to limit behavior instead of blindly approving every request.'
      },
      {
        id: 'permissions',
        term: 'Permissions',
        description:
          'Permissions are the allow or deny choices shown to users when deciding what a signer or connected client can do. They are the user-facing version of the rules that become a saved policy.'
      },
      {
        id: 'permission-policy',
        term: 'Permission policy',
        description:
          'A permission policy is the specific rule set for what a connected client is allowed to request. In Igloo Server this is how a Nostr Connect session can be narrowed to approved actions.'
      },
      {
        id: 'manual-signing',
        term: 'Manual signing',
        description:
          'Manual signing means the app prompts the user to approve a request instead of signing automatically in the background. It gives the user an explicit checkpoint before a signature is made.'
      }
    ]
  },
  {
    id: 'nostr-connect',
    title: 'Nostr Connect',
    description: 'These terms are specific to the remote signer flow used by Igloo Server.',
    entries: [
      {
        id: 'nip-46',
        term: 'NIP-46',
        description:
          'NIP-46 is the Nostr standard behind Nostr Connect remote signing. In the FROSTR apps, this means connecting clients to a signer so they can request signatures over Nostr.'
      },
      {
        id: 'nostr-connect',
        term: 'Nostr Connect',
        description:
          'Nostr Connect is the common product name for the NIP-46 remote signer flow. It is how Igloo Server lets another app talk to your signer without sharing the raw private key.'
      },
      {
        id: 'transport-key',
        term: 'Transport key',
        description:
          'A transport key is the key material used for the Nostr Connect communication channel. Users may see it when pairing or managing NIP-46 connections in Igloo Server.'
      },
      {
        id: 'api-key',
        term: 'API key',
        description:
          'An API key is a token that lets a client authenticate to Igloo Server without an interactive login flow. It is mainly used for scripts, apps, and automation.'
      },
      {
        id: 'session',
        term: 'Session',
        description:
          'A session is an active authenticated connection or relationship with the server or signer. In practice it often means a logged-in browser session or an active NIP-46 connection.'
      }
    ]
  },
  {
    id: 'server-setup-and-access',
    title: 'Server Setup And Access',
    description: 'These are the main server-side setup and access terms visible to users and operators.',
    entries: [
      {
        id: 'onboarding',
        term: 'Onboarding',
        description:
          'Onboarding is the first-run setup flow that gets a new app or server ready for use. In Igloo Server it is the guided setup before normal administration and signing.'
      },
      {
        id: 'headless-mode',
        term: 'Headless mode',
        description:
          'Headless mode means Igloo Server runs without the normal web UI workflow and is configured mainly through environment variables and APIs.'
      },
      {
        id: 'database-mode',
        term: 'Database mode',
        description:
          'Database mode is the fuller server setup with a web UI, stored users, and persisted configuration. It is the more guided mode for regular server use.'
      },
      {
        id: 'api-key',
        term: 'API key',
        description:
          'An API key is a token that lets a client authenticate to Igloo Server without an interactive login flow. It is mainly used for scripts, apps, and automation.'
      }
    ]
  }
];
