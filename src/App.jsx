import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
const PROJECT_NUMBER = 2;
const ORG = 'FROSTR-ORG';
const GITHUB_API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

const ProjectBoard = () => {
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState(null);

  const fetchProjectData = async () => {
    setError(null);

    // Using the simplified query from the old version
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
    } finally {
      // do something
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  // Modified grouping function to separate sprint items from backlog
  const separateSprintAndBacklogItems = (items) => {
    const sprintItems = [];
    const backlogItems = [];

    items.nodes.forEach(item => {
      // Check if item has assignees, state, or url - indicators of a sprint item
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
    <div className="max-w-6xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <h1 className="text-2xl font-bold">Frostr</h1>
        </CardHeader>
        <CardContent>
        Simple t-of-n remote signing and key rotation protocol for nostr, using the powers of FROST.
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {projectData && (
        <>
          {/* Active Sprint Items Section */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Active Sprint Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {separateSprintAndBacklogItems(projectData.items).sprintItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.content?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-[1.02]"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <h3 className="font-medium mb-2">
                        {item.content.title}
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        {item.content?.number && <div>#{item.content.number}</div>}
                        {item.content?.state && <div>State: {item.content.state}</div>}
                        {item.content?.assignees?.nodes?.[0] && (
                          <div>Assignee: @{item.content.assignees.nodes[0].login}</div>
                        )}
                      </div>
                      {item.content?.labels?.nodes?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {item.content.labels.nodes.map((label) => (
                            <span
                              key={label.name}
                              className="px-2 py-1 text-xs rounded-full"
                              style={{
                                backgroundColor: `#${label.color}30`,
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

          {/* Backlog Items Section */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Backlog</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {separateSprintAndBacklogItems(projectData.items).backlogItems.map((item, index) => (
                <a 
                  key={index} 
                  href="https://github.com/orgs/FROSTR-ORG/projects/2/views/1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform hover:scale-[1.02]"
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <h3 className="font-medium">
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
  );
};

export default ProjectBoard;