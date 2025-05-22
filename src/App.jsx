import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GitFork, CheckCircle2, Network, Binary, ExternalLink, BookOpen, Music, Video as VideoIcon, Menu, X, Radio } from 'lucide-react';
import frostrLogo from '/frostr-logo-transparent.png';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';
const PROJECT_NUMBER = 2;
const ORG = 'FROSTR-ORG';
const GITHUB_API_KEY = import.meta.env.VITE_GITHUB_API_KEY;

const MarkdownComponents = {
  h1: function MarkdownH1(props) { return <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-100 first:mt-0" {...props} />; },
  h2: function MarkdownH2(props) { return <h2 className="text-2xl font-semibold mt-6 mb-3 text-gray-200" {...props} />; },
  h3: function MarkdownH3(props) { return <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-300" {...props} />; },
  p: function MarkdownP(props) {
    const sectionMatch = props.children?.[0]?.match?.(/^(`[^`]+`)\s*:\s*(.+)$/);
    if (sectionMatch) {
      return (
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-32 text-[#00ff95]">
            <code className="bg-[#ffffff10] rounded px-1.5 font-mono align-baseline">{sectionMatch[1].slice(1, -1)}</code>
            <span className="text-gray-300 ml-1">:</span>
          </div>
          <p className="text-gray-300 flex-1">{sectionMatch[2]}</p>
        </div>
      );
    }
    return <p className="text-gray-300 mb-4 leading-relaxed [&>code]:align-baseline [&>code]:inline [&>code]:leading-none" {...props} />;
  },
  ul: function MarkdownUl(props) { return <ul className="list-none space-y-2 mb-4" {...props} />; },
  li: function MarkdownLi(props) {
    return (
      <li className="text-gray-300 flex items-start">
        <span className="mr-2 mt-2 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
        <span>{props.children}</span>
      </li>
    );
  },
  a: function MarkdownA(props) {
    return (
      <a 
        className="text-[#00f0ff] hover:text-[#00ff95] transition-colors" 
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },
  code: function MarkdownCode({inline, ...props}) {
    return inline ? (
      <code className="bg-[#ffffff10] rounded px-1.5 py-0.5 font-mono text-[#00ff95] inline leading-none align-baseline" {...props} />
    ) : (
      <code className="block bg-[#ffffff10] rounded p-4 font-mono text-[#00ff95] mb-4" {...props} />
    );
  }
};

MarkdownComponents.h1.propTypes = { children: PropTypes.node };
MarkdownComponents.h2.propTypes = { children: PropTypes.node };
MarkdownComponents.h3.propTypes = { children: PropTypes.node };
MarkdownComponents.p.propTypes = { children: PropTypes.arrayOf(PropTypes.node) };
MarkdownComponents.ul.propTypes = { children: PropTypes.node };
MarkdownComponents.li.propTypes = { children: PropTypes.node };
MarkdownComponents.a.propTypes = { children: PropTypes.node };
MarkdownComponents.code.propTypes = { 
  children: PropTypes.node,
  inline: PropTypes.bool
};

// Media items data
const mediaItems = [
  {
    title: "No Password Reset? How Frostr Saves Your Nostr Identity",
    thumbnail: "https://plebdevs-bucket.nyc3.cdn.digitaloceanspaces.com/images/frostr-bitcoin-magazine.png",
    description: "Born out of a hackathon at TABCONF 2024, Frostr may have just solved Nostr's most pernicious issue: the inability to reset your password if your private key gets compromised.",
    link: "https://bitcoinmagazine.com/business/no-password-reset-how-frostr-saves-your-nostr-identity",
    source: "Bitcoin Magazine",
    type: "Article"
  },
  {
    title: "Frostr Explained",
    thumbnail: "https://i.scdn.co/image/ab6765630000ba8ac6d48028ef9d5ba0483dc08a",
    description: "New TGFN episode is out, in which @cmd and @bitcoinplebdev tell us about FROSTR — stick around past the end credits for a bonus segment, in which they trash @fiatjaf's promenade project.",
    link: "https://fountain.fm/episode/gWYJ5PgxwzdnBjuNuzyc",
    source: "Thank God For Nostr Podcast",
    type: "Podcast"
  },
  {
    title: "Frostr.org: Solving Nostr's Biggest Problem",
    thumbnail: "/frostr-bitcoin-magazine-space.png",
    description: "Featured on Bitcoin Magazine's Space discussing Frostr, a project addressing critical challenges in the Nostr ecosystem. Speaking alongside JuanGalt and Topher.",
    link: "https://creators.spotify.com/pod/show/bitcoin-magazine-po/episodes/FROSTR-Explained-A-Gamechanger-for-NOSTR-Identity-Management--The-Juan-Galt-Show-e30op20",
    source: "Bitcoin Magazine",
    type: "Space"
  },
  {
    title: "NOSTR is a MASSIVE Paradigm Shift! PlebDevs and Frostr with Austin - bitcoinplebdev",
    thumbnail: "https://i.ytimg.com/vi/ebCGWjA29VE/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBLof5gHOVUJu0IAj_JyMThJt83XA",
    description: "NOSTR Is a MASSIVE Paradigm Shift! i am joined by bitcoiner and dev Austin from pleb devs and he breaks down what he's done and what he's working on with nostr and it is not only bullishAF but mind blowing!. an awesome interview of pure bitcoin builder signal.",
    link: "https://www.youtube.com/watch?v=ebCGWjA29VE",
    source: "Pleb Underground",
    type: "Video"
  }
];

export default function ProjectBoard() {
  const [projectData, setProjectData] = useState(null);
  const [orgData, setOrgData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    fetchOrgData();
    fetchProjectData();
  }, []);

  const separateSprintAndBacklogItems = (items) => {
    const activeSprintItems = [];
    const completedItems = [];
    const backlogItems = [];

    items.nodes.forEach(item => {
      // Find status by checking all field values
      const status = item.fieldValues.nodes.find(node => 
        node.name === 'Done' || 
        node.name === 'In progress' || 
        node.name === 'Todo'
      )?.name?.toLowerCase() || '';

      if (status === 'done') {
        completedItems.push(item);
      } else if (status === 'in progress' || status === 'todo') {
        activeSprintItems.push(item);
      } else {
        backlogItems.push(item);
      }
    });

    return { activeSprintItems, completedItems, backlogItems };
  };

  const renderAboutTab = () => (
    <>
      <Card className="border-0 bg-[#161f33]/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
        <CardContent className="prose prose-invert max-w-none p-8">
          {orgData?.repository?.object?.text ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {orgData.repository.object.text}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-300">Loading...</p>
          )}
        </CardContent>
      </Card>

      {orgData?.membersWithRole?.nodes?.length > 0 && (
        <Card className="border-0 bg-[#161f33]/40 backdrop-blur-xl shadow-2xl overflow-hidden mt-8">
          <CardHeader className="border-b border-[#ffffff0f]">
            <h2 className="text-2xl font-semibold text-gray-200">Project Maintainers</h2>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orgData.membersWithRole.nodes.map((member) => (
                <a
                  key={member.login}
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transform hover:scale-[1.02] transition-all duration-300"
                >
                  <Card className="border-0 bg-[#ffffff05] hover:bg-[#ffffff08] transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={member.avatarUrl}
                          alt={member.login}
                          className="w-12 h-12 rounded-full ring-2 ring-[#00f0ff]/20"
                        />
                        <div>
                          <h3 className="font-semibold text-[#00f0ff]">
                            {member.name || member.login}
                          </h3>
                          <p className="text-sm text-gray-400 font-mono">@{member.login}</p>
                        </div>
                      </div>
                      {member.bio && (
                        <p className="mt-3 text-sm text-gray-300 line-clamp-2">{member.bio}</p>
                      )}
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );

  const renderMediaTab = () => (
    <>
      <Card className="border-0 bg-[#161f33]/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
        <CardHeader className="border-b border-[#ffffff0f]">
          <h2 className="text-2xl font-semibold text-gray-200">Media Coverage</h2>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaItems.map((mediaItem, index) => (
              <a
                key={index}
                href={mediaItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block transform hover:scale-[1.02] transition-all duration-300"
              >
                <Card className="h-full border-0 bg-[#ffffff05] hover:bg-[#ffffff08] transition-colors overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden relative">
                    <img
                      src={mediaItem.thumbnail}
                      alt={mediaItem.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium px-2 py-1 rounded flex items-center gap-1.5 ${
                        mediaItem.type === "Article" 
                          ? "text-[#00ff95] bg-[#00ff9515]" 
                          : mediaItem.type === "Podcast"
                            ? "text-[#ff9500] bg-[#ff950015]"
                            : mediaItem.type === "Video"
                              ? "text-[#ff00f0] bg-[#ff00f015]"
                              : "text-[#1d9bf0] bg-[#1d9bf015]"
                      }`}>
                        {mediaItem.type === "Article" && <BookOpen className="w-3.5 h-3.5" />}
                        {mediaItem.type === "Podcast" && <Music className="w-3.5 h-3.5" />}
                        {mediaItem.type === "Video" && <VideoIcon className="w-3.5 h-3.5" />}
                        {mediaItem.type === "Space" && <Radio className="w-3.5 h-3.5" />}
                        {mediaItem.type}
                      </span>
                      <span className="text-sm text-gray-400">{mediaItem.source}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">{mediaItem.title}</h3>
                    <p className="text-sm text-gray-300 line-clamp-3 mb-4">{mediaItem.description}</p>
                    <div className="flex items-center text-[#00f0ff] text-sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>
                        {mediaItem.type === "Article" && "Read More"}
                        {mediaItem.type === "Podcast" && "Listen"}
                        {mediaItem.type === "Video" && "Watch"}
                        {mediaItem.type === "Space" && "Join Space"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderRoadmapTab = () => (
    projectData && (
      <>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#00ff95]" />
            <h2 className="text-2xl font-semibold text-gray-200">Completed Sprint Items</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {separateSprintAndBacklogItems(projectData.items).completedItems.map((item, index) => (
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
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.content.state === 'CLOSED' 
                          ? 'bg-[#8957e520] text-[#8957e5] border border-[#8957e540]'
                          : 'bg-[#00ff9520] text-[#00ff95] border border-[#00ff9540]'
                      }`}>
                        {item.content.state}
                      </div>
                      {item.content?.assignees?.nodes?.[0] && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Completed by:</span>
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

        <div className="space-y-6 mt-8">
          <div className="flex items-center gap-3">
            <Network className="w-6 h-6 text-[#00f0ff]" />
            <h2 className="text-2xl font-semibold text-gray-200">Active Sprint Items</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {separateSprintAndBacklogItems(projectData.items).activeSprintItems.map((item, index) => (
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
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          item.content.state === 'CLOSED' 
                            ? 'bg-[#8957e520] text-[#8957e5] border border-[#8957e540]'
                            : 'bg-[#00ff9520] text-[#00ff95] border border-[#00ff9540]'
                        }`}>
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

        <div className="space-y-6 mt-8">
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
    )
  );

  return (
    <div className="min-h-screen bg-[#0a0f1a] bg-opacity-95 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a]" />
      
      <div className="relative max-w-7xl mx-auto p-6 md:p-8 space-y-8 max-md:p-2">
        {/* Header with Tabs */}
        <div className="flex items-center justify-between border-b border-[#ffffff1a] pb-4">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setActiveTab("about")}
          >
            <div className="relative w-10 h-10">
              <img 
                src={frostrLogo} 
                alt="Frostr Logo" 
                className="w-10 h-10 absolute inset-0"
              />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff95] to-[#00f0ff] font-mono">
              FROSTR
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <button
              onClick={() => setActiveTab("about")}
              className={`px-4 py-2 text-lg font-medium transition-colors ${
                activeTab === "about"
                  ? "text-[#00ff95] border-b-2 border-[#00ff95]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab("media")}
              className={`px-4 py-2 text-lg font-medium transition-colors ${
                activeTab === "media"
                  ? "text-[#00ff95] border-b-2 border-[#00ff95]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Media
            </button>
            <button
              onClick={() => setActiveTab("roadmap")}
              className={`px-4 py-2 text-lg font-medium transition-colors ${
                activeTab === "roadmap"
                  ? "text-[#00ff95] border-b-2 border-[#00ff95]"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              Roadmap
            </button>
          </div>
          
          {/* GitHub Link */}
          <div className="flex items-center">
            <a 
              href={`https://github.com/${ORG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-[#00f0ff] transition-colors"
            >
              <GitFork className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              className="ml-4 md:hidden text-gray-300 hover:text-[#00ff95] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#161f33]/90 backdrop-blur-lg rounded-md shadow-lg border border-[#ffffff10] p-4 absolute z-50 left-2 right-2 mt-2 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setActiveTab("about");
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 text-lg font-medium transition-colors rounded-md ${
                  activeTab === "about"
                    ? "bg-[#00ff9520] text-[#00ff95]"
                    : "text-gray-300 hover:bg-[#ffffff10]"
                }`}
              >
                About
              </button>
              <button
                onClick={() => {
                  setActiveTab("media");
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 text-lg font-medium transition-colors rounded-md ${
                  activeTab === "media"
                    ? "bg-[#00ff9520] text-[#00ff95]"
                    : "text-gray-300 hover:bg-[#ffffff10]"
                }`}
              >
                Media
              </button>
              <button
                onClick={() => {
                  setActiveTab("roadmap");
                  setMobileMenuOpen(false);
                }}
                className={`px-4 py-3 text-lg font-medium transition-colors rounded-md ${
                  activeTab === "roadmap"
                    ? "bg-[#00ff9520] text-[#00ff95]"
                    : "text-gray-300 hover:bg-[#ffffff10]"
                }`}
              >
                Roadmap
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="bg-red-900/20 border border-red-500/50 text-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "about" 
            ? renderAboutTab() 
            : activeTab === "media" 
              ? renderMediaTab()
              : renderRoadmapTab()
          }
        </div>
      </div>
    </div>
  );
}