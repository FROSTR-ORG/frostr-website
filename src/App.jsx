import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import About from './components/routes/About';
import Apps from './components/routes/Apps';
import Media from './components/routes/Media';
import Roadmap from './components/routes/Roadmap';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
const PROJECT_NUMBER = 2;
const ORG = 'FROSTR-ORG';
const GITHUB_API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

export default function App() {
  const [projectData, setProjectData] = useState(null);
  const [orgData, setOrgData] = useState(null);
  const [error, setError] = useState(null);

  const fetchOrgData = async () => {
    setError(null);
    const query = `
      query {
        organization(login: "${ORG}") {
          name
          description
          repositories(first: 10) {
            nodes {
              name
              description
              url
              stargazerCount
            }
          }
          membersWithRole(first: 10) {
            nodes {
              login
              name
              avatarUrl
              url
              bio
            }
          }
          repository(name: ".github") {
            object(expression: "master:profile/README.md") {
              ... on Blob {
                text
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

      setOrgData(data.data.organization);
    } catch (err) {
      setError(err.message);
    }
  };

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
    fetchOrgData();
    fetchProjectData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout error={error} />}>
          <Route index element={<About orgData={orgData} />} />
          <Route path="apps" element={<Apps />} />
          <Route path="media" element={<Media />} />
          <Route path="roadmap" element={<Roadmap projectData={projectData} />} />
        </Route>
      </Routes>
    </Router>
  );
}