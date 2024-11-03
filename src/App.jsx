import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Binary, Code2, Snowflake, Network, KeyRound, BuildingIcon, GitFork } from 'lucide-react';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
const PROJECT_NUMBER = 2;
const ORG = 'FROSTR-ORG';
const GITHUB_API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

export default function ProjectBoard() {
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);

  // Keeping the existing data fetching logic unchanged
  const fetchProjectData = async () => {
    setError(null);
    const query = `
      query {
        organization(login: "${ORG}") {
          projectV2(number: ${PROJECT_NUMBER}) {
            items(first: 100) {
              nodes {
                fieldValues(first: 8) {
                  nodes {
                    ... on ProjectV2ItemFieldSingleSelectValue {
                      name
                      field {
                        ... on ProjectV2Field {
                          name
                        }
                      }
                    }
                    ... on ProjectV2ItemFieldTextValue {
                      text
                      field {
                        ... on ProjectV2Field {
                          name
                        }
                      }
                    }
                  }
                }
                content {
                  ... on Issue {
                    title
                    number
                    url
                    state
                    labels(first: 5) {
                      nodes {
                        name
                        color
                      }
                    }
                    assignees(first: 1) {
                      nodes {
                        login
                      }
                    }
                  }
                  ... on DraftIssue {
                    title
                  }
                }
              }
            }
          }
        }
      }
    `;

    try {
      const response = await fetch(GITHUB_GRAPHQL_URL, {
        method: "POST",
        headers: {
          Authorization: `bearer ${GITHUB_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (data.errors) {
        throw new Error(data.errors[0].message);
      }

      setProjectData(data.data.organization.projectV2);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  const separateSprintAndBacklogItems = (items) => {
    const sprintItems = [];
    const backlogItems = [];

    items.nodes.forEach(item => {
      const isSprintItem = item.content?.assignees || item.content?.state || item.content?.url;
      if (isSprintItem) {
        sprintItems.push(item);
      } else {
        backlogItems.push(item);
      }
    });

    return { sprintItems, backlogItems };
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] bg-opacity-95 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a]" />
      
      <div className="relative max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        <Card className="border-0 bg-[#161f33]/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
          <CardHeader className="border-b border-[#ffffff0f]">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Snowflake className="w-8 h-8 text-[#00ff95] absolute inset-0" />
              </div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff95] to-[#00f0ff] font-mono">
                Frostr
              </h1>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <div className="space-y-6">
              <p className="text-lg text-gray-400 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#00ff95]" />
                Simple t-of-n remote signing and key rotation protocol for nostr, using the powers of FROST.
              </p>
              
              {/* Key Features Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#00ff95]" />
                  <h2 className="text-lg font-semibold text-gray-200">Key Features</h2>
                </div>
                <ul className="grid md:grid-cols-2 gap-3 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00ff95]">•</span>
                    Break up your secret key into decentralized, distributable shares
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00ff95]">•</span>
                    Sign messages using t-of-n signing devices
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00ff95]">•</span>
                    If one share is compromised, your secret key is still safe
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00ff95]">•</span>
                    Discard and replace shares without changing your identity
                  </li>
                </ul>
              </div>

              {/* Architecture Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="w-5 h-5 text-[#00ff95]" />
                  <h2 className="text-lg font-semibold text-gray-200">Architecture</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <a 
                    href="https://github.com/frostr-org/bifrost"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-2 p-3 rounded-lg bg-[#ffffff05] hover:bg-[#ffffff15] transition-all duration-200 relative z-10"
                  >
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-[#00f0ff]" />
                      <span className="text-[#00f0ff] font-mono">Bifrost</span>
                    </div>
                    <p className="text-gray-400 text-sm">FROSTR cryptography and protocol library</p>
                  </a>
                  <a 
                    href="https://github.com/frostr-org/igloo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-2 p-3 rounded-lg bg-[#ffffff05] hover:bg-[#ffffff15] transition-all duration-200 relative z-10"
                  >
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-[#00f0ff]" />
                      <span className="text-[#00f0ff] font-mono">Igloo</span>
                    </div>
                    <p className="text-gray-400 text-sm">Desktop key management app & signing device</p>
                  </a>
                  <a 
                    href="https://github.com/frostr-org/permafrost"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-2 p-3 rounded-lg bg-[#ffffff05] hover:bg-[#ffffff15] transition-all duration-200 relative z-10"
                  >
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-[#00f0ff]" />
                      <span className="text-[#00f0ff] font-mono">PermaFrost</span>
                    </div>
                    <p className="text-gray-400 text-sm">Remote signing server (using express)</p>
                  </a>
                  <a 
                    href="https://github.com/frostr-org/frost2x"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-2 p-3 rounded-lg bg-[#ffffff05] hover:bg-[#ffffff15] transition-all duration-200 relative z-10"
                  >
                    <div className="flex items-center gap-2">
                      <GitFork className="w-4 h-4 text-[#00f0ff]" />
                      <span className="text-[#00f0ff] font-mono">Frost2x</span>
                    </div>
                    <p className="text-gray-400 text-sm">Browser signing extension (forked from nos2x)</p>
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border border-red-500/50 text-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {projectData && (
          <>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Network className="w-6 h-6 text-[#00f0ff]" />
                <h2 className="text-2xl font-semibold text-gray-200">Active Sprint Items</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {separateSprintAndBacklogItems(projectData.items).sprintItems.map((item, index) => (
                  <a 
                    key={index}
                    href={item.content?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Card className="h-full border-0 bg-[#161f33]/40 backdrop-blur-xl overflow-hidden relative group">
                      <CardContent className="p-6 relative z-10">
                        <h3 className="font-semibold text-lg mb-4 text-gray-200">
                          {item.content.title}
                        </h3>
                        <div className="space-y-3 text-sm text-gray-400">
                          {item.content?.number && (
                            <div className="font-mono">#{item.content.number}</div>
                          )}
                          {item.content?.state && (
                            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#00ff9520] text-[#00ff95] border border-[#00ff9540]">
                              {item.content.state}
                            </div>
                          )}
                          {item.content?.assignees?.nodes?.[0] && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">Assignee:</span>
                              <span className="font-mono text-[#00f0ff]">
                                @{item.content.assignees.nodes[0].login}
                              </span>
                            </div>
                          )}
                        </div>
                        {item.content?.labels?.nodes?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {item.content.labels.nodes.map((label) => (
                              <span
                                key={label.name}
                                className="px-2 py-1 text-xs rounded-full font-medium border"
                                style={{
                                  backgroundColor: `#${label.color}15`,
                                  borderColor: `#${label.color}30`,
                                  color: `#${label.color}`
                                }}
                              >
                                {label.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Binary className="w-6 h-6 text-[#00f0ff]" />
                <h2 className="text-2xl font-semibold text-gray-200">Backlog</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {separateSprintAndBacklogItems(projectData.items).backlogItems.map((item, index) => (
                  <a 
                    key={index} 
                    href="https://github.com/orgs/FROSTR-ORG/projects/2/views/1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transform hover:scale-[1.02] transition-all duration-300"
                  >
                    <Card className="h-full border-0 bg-[#161f33]/40 backdrop-blur-xl overflow-hidden relative group">
                      <CardContent className="p-6">
                        <h3 className="font-medium text-lg text-gray-200">
                          {item.content?.title || 'Untitled Item'}
                        </h3>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}