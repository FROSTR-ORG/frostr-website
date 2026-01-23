import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Smartphone, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import {
  decodePublicKey,
  generateKeypair,
  getEventHash,
  getPublicKey,
  getUnixTime,
  Nostr,
  signEvent
} from 'snstr';
// Import local browser-compatible NIP-04 encrypt (bypasses Vite module resolution issues)
import { encrypt as encryptNIP04Web } from '@/utils/nip04-encrypt';

// Target npub decoded to hex pubkey
const TARGET_NPUB = 'npub1s9etjgzjglwlaxdhsveq0qksxyh6xpdpn8ajh69ruetrug957r3qpklxzl';
const TARGET_PUBKEY = decodePublicKey(TARGET_NPUB);

// ============================================
// TEMPORARY RATE LIMITING - REMOVE WHEN NO LONGER NEEDED
// This section implements a 24-hour cooldown between submissions
// to prevent spam/abuse of the TestFlight signup form
// ============================================
const STORAGE_KEY = 'frostr_testflight_last_submit';
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Get the timestamp of the last submission from localStorage
function getLastSubmitTime() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? parseInt(stored, 10) : null;
  } catch {
    // localStorage might be unavailable (private browsing, etc.)
    return null;
  }
}

// Save the current timestamp as the last submission time
function setLastSubmitTime() {
  try {
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
  } catch {
    // Silently fail if localStorage is unavailable
  }
}

// Check if user is still within the 24-hour cooldown period
function isOnCooldown() {
  const lastSubmit = getLastSubmitTime();
  if (!lastSubmit) return false;
  return (Date.now() - lastSubmit) < COOLDOWN_MS;
}
// ============================================
// END TEMPORARY RATE LIMITING (localStorage)
// ============================================

// ============================================
// TEMPORARY RATE LIMITING - REMOVE WHEN NO LONGER NEEDED
// Minimum time user must be on page before submit is enabled
// Prevents automated bot submissions that fire immediately
// ============================================
const MIN_TIME_ON_PAGE_MS = 5000; // 5 seconds
// ============================================
// END TEMPORARY RATE LIMITING (time-on-page constant)
// ============================================

const RELAYS = [
  'wss://relay.damus.io',
  'wss://relay.primal.net'
];

async function sendSignupDM(email) {
  // Generate ephemeral keypair
  const keys = await generateKeypair();
  const senderPubkey = getPublicKey(keys.privateKey);

  // Create message content
  const message = `TestFlight Signup Request\nEmail: ${email}\nTimestamp: ${new Date().toISOString()}`;

  // Encrypt message using web-compatible NIP-04 (crypto-js based)
  const encryptedContent = encryptNIP04Web(keys.privateKey, TARGET_PUBKEY, message);

  // Build a signed kind-4 event (relays reject unsigned events)
  const unsignedEvent = {
    kind: 4,
    content: encryptedContent,
    tags: [['p', TARGET_PUBKEY]],
    pubkey: senderPubkey,
    created_at: getUnixTime()
  };
  const id = await getEventHash(unsignedEvent);
  const sig = await signEvent(id, keys.privateKey);
  const signedEvent = { ...unsignedEvent, id, sig };

  // Create Nostr client and set the ephemeral private key
  const client = new Nostr(RELAYS);
  client.setPrivateKey(keys.privateKey);

  // Connect to relays
  await client.connectToRelays();

  // Publish signed kind-4 DM event
  const publishResult = await client.publishEvent(signedEvent);

  // Disconnect
  client.disconnectFromRelays();

  if (!publishResult?.success || !publishResult.event) {
    const failures = publishResult?.relayResults
      ? Array.from(publishResult.relayResults.entries())
        .filter(([_, result]) => !result.success)
        .map(([url, result]) => `${url}: ${result.reason || 'unknown error'}`)
        .join('; ')
      : 'unknown error';
    throw new Error(`Failed to publish signup to relays (${failures})`);
  }

  return publishResult.event;
}

function TestflightSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  // ============================================
  // TEMPORARY RATE LIMITING - REMOVE WHEN NO LONGER NEEDED
  // Track whether user has been on page long enough to submit
  // This prevents bots that submit forms immediately on page load
  // ============================================
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    // Enable submit button after MIN_TIME_ON_PAGE_MS
    const timer = setTimeout(() => {
      setCanSubmit(true);
    }, MIN_TIME_ON_PAGE_MS);

    return () => clearTimeout(timer);
  }, []);
  // ============================================
  // END TEMPORARY RATE LIMITING (time-on-page effect)
  // ============================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ============================================
    // TEMPORARY RATE LIMITING CHECKS - REMOVE WHEN NO LONGER NEEDED
    // ============================================

    // Check time-on-page requirement (anti-bot measure)
    if (!canSubmit) {
      setErrorMessage('Please wait a moment before submitting');
      setStatus('error');
      return;
    }

    // Check 24-hour cooldown (anti-spam measure)
    if (isOnCooldown()) {
      setErrorMessage('You\'ve already signed up. Please wait 24 hours to try again.');
      setStatus('error');
      return;
    }
    // ============================================
    // END TEMPORARY RATE LIMITING CHECKS
    // ============================================

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await sendSignupDM(email);

      // ============================================
      // TEMPORARY: Record submission time for cooldown
      // REMOVE WHEN NO LONGER NEEDED
      // ============================================
      setLastSubmitTime();
      // ============================================

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage(error.message || 'Failed to submit. Please try again.');
      setStatus('error');
    }
  };

  return (
    <Card className="border border-[#00f0ff40] bg-[#161f33]/40 backdrop-blur-xl shadow-2xl overflow-hidden relative mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff08] via-transparent to-[#00ff9508]" />
      <CardContent className="p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-[#00f0ff20]">
            <Smartphone className="w-6 h-6 text-[#00f0ff]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-200">Igloo iOS TestFlight</h3>
            <p className="text-sm text-gray-400">Be the first to try Igloo on iOS</p>
          </div>
        </div>

        {status === 'success' ? (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[#00ff9520] border border-[#00ff9540]">
            <CheckCircle className="w-5 h-5 text-[#00ff95] flex-shrink-0" />
            <p className="text-[#00ff95]">You&apos;re on the list! We&apos;ll send you an invite when TestFlight is ready.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-gray-300">
              Sign up to get early access to Igloo for iOS when it becomes available on TestFlight.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="flex-1 bg-[#0a0f1a] border-[#ffffff20] text-gray-200 placeholder:text-gray-500 focus:border-[#00f0ff] focus:ring-[#00f0ff]"
              />
              <Button
                type="submit"
                disabled={status === 'loading' || !canSubmit} // TEMPORARY: !canSubmit is rate limiting - remove when no longer needed
                className="bg-[#00f0ff] hover:bg-[#00f0ff]/80 text-[#0a0f1a] font-medium px-6 whitespace-nowrap"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : !canSubmit ? (
                  'Please wait...' // TEMPORARY: Rate limiting message - remove when no longer needed
                ) : (
                  'Get Early Access'
                )}
              </Button>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-xs text-gray-500">
              Your email is sent via encrypted Nostr DM.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

export default TestflightSignup;
