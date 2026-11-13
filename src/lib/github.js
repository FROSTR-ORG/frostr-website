const ORG = 'FROSTR-ORG';

/** Fetch only public metadata; browser builds must never contain a GitHub token. */
export async function fetchPublicOrgData() {
  const profile = await fetch(
    `https://raw.githubusercontent.com/${ORG}/.github/master/profile/README.md`,
    { credentials: 'omit' },
  );
  if (!profile.ok) {
    throw new Error(`GitHub information unavailable (${profile.status}).`);
  }
  const text = await profile.text();

  // Public members are optional: rate limits must not hide the profile README.
  let members = [];
  try {
    const response = await fetch(`https://api.github.com/orgs/${ORG}/public_members?per_page=10`, {
      credentials: 'omit',
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (response.ok) {
      members = (await response.json()).map((member) => ({
        login: member.login,
        avatarUrl: member.avatar_url,
        url: member.html_url,
      }));
    }
  } catch {
    // Keep the successfully loaded profile when optional metadata is unavailable.
  }
  return { repository: { object: { text } }, membersWithRole: { nodes: members } };
}
