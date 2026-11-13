import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchPublicOrgData } from './github.js';

const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

test('loads public metadata with credentials omitted and no authorization header', async () => {
  const calls = [];
  const responses = [
    { ok: true, text: async () => '# FROSTR' },
    { ok: true, json: async () => [{ login: 'alice', avatar_url: 'avatar', html_url: 'profile' }] },
  ];
  globalThis.fetch = async (...args) => { calls.push(args); return responses.shift(); };
  const data = await fetchPublicOrgData();
  assert.equal(data.repository.object.text, '# FROSTR');
  assert.deepEqual(data.membersWithRole.nodes, [{ login: 'alice', avatarUrl: 'avatar', url: 'profile' }]);
  assert.equal(calls.length, 2);
  for (const [, options] of calls) {
    assert.equal(options.credentials, 'omit');
    assert.equal(new Headers(options.headers).has('Authorization'), false);
  }
});

test('preserves the README when optional members are rate limited', async () => {
  const responses = [
    { ok: true, text: async () => '# FROSTR' },
    { ok: false, status: 403 },
  ];
  globalThis.fetch = async () => responses.shift();
  assert.deepEqual(await fetchPublicOrgData(), {
    repository: { object: { text: '# FROSTR' } }, membersWithRole: { nodes: [] },
  });
});

test('reports a failed profile request instead of parsing its error page', async () => {
  globalThis.fetch = async () => ({ ok: false, status: 503 });
  await assert.rejects(fetchPublicOrgData, /GitHub information unavailable \(503\)/);
});
