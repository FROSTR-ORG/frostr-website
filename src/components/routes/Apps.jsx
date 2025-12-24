import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ExternalLink, Computer, Globe, Puzzle, Server, Terminal, Library, Smartphone } from 'lucide-react';

const appItems = [
  {
    title: "Igloo Desktop",
    description: "A desktop application for FROSTR. Download the latest version for your platform.",
    links: [
      { label: "View Releases", url: "https://github.com/FROSTR-ORG/igloo-desktop/releases" },
      { label: "View on GitHub", url: "https://github.com/FROSTR-ORG/igloo-desktop" }
    ],
    icon: <Computer className="w-8 h-8 text-[#00f0ff]" />,
    type: "Desktop App"
  },
  {
    title: "Igloo Android (alpha)",
    description: "An Android signing app for FROSTR. Early alpha builds are available on GitHub releases.",
    links: [
      { label: "View Releases", url: "https://github.com/frostr-org/igloo-android/releases" },
      { label: "View on GitHub", url: "https://github.com/frostr-org/igloo-android" }
    ],
    icon: <Smartphone className="w-8 h-8 text-[#00f0ff]" />,
    type: "Mobile App"
  },
  {
    title: "Igloo CLI",
    description: "A command-line utility for scaffolding and managing FROSTR projects. Discover it on npm or browse the source code.",
    links: [
      { label: "View on npm", url: "https://www.npmjs.com/package/@frostr/igloo-cli" },
      { label: "View on GitHub", url: "https://github.com/FROSTR-ORG/igloo-cli" }
    ],
    icon: <Terminal className="w-8 h-8 text-[#00f0ff]" />,
    type: "CLI Tool"
  },
  {
    title: "Frost2x",
    description: "A FROSTR browser extension, forked from nos2x. Install it from the Chrome Web Store or check out the code.",
    links: [
      { label: "View on GitHub", url: "https://github.com/FROSTR-ORG/frost2x" },
      { label: "View Releases", url: "https://github.com/FROSTR-ORG/frost2x/releases" },
      { label: "Get on Chrome Store", url: "https://chromewebstore.google.com/detail/frost2x/gpbndcgoaehgeckcfmmbmaaaeljnaiof" }
    ],
    icon: <Puzzle className="w-8 h-8 text-[#00f0ff]" />,
    type: "Browser Extension"
  },
  {
    title: "Igloo Web",
    description: "The official FROSTR web signer. A browser-based signing device for the FROSTR protocol.",
    links: [
      { label: "Open App", url: "https://iglooweb.app" },
      { label: "View on GitHub", url: "https://github.com/frostr-org/igloo-web" }
    ],
    icon: <Globe className="w-8 h-8 text-[#00f0ff]" />,
    type: "Web App"
  },
  {
    title: "Igloo Server",
    description: "A server-based signing device and personal ephemeral relay for the FROSTR protocol. Self-hostable with web UI for configuration and monitoring.",
    links: [
      { label: "View on GitHub", url: "https://github.com/FROSTR-ORG/igloo-server" },
      { label: "View Releases", url: "https://github.com/FROSTR-ORG/igloo-server/releases" }
    ],
    icon: <Server className="w-8 h-8 text-[#00f0ff]" />,
    type: "Server"
  }
];

const libraryItems = [
  {
    title: "Bifrost",
    description: "Reference client implementation of FROSTR protocol. Each client custodies a share and acts as a node within your FROSTR network. Uses nostr relays to communicate peer-to-peer and coordinate signing. All traffic between nodes is end-to-end encrypted.",
    links: [
      { label: "View on npm", url: "https://www.npmjs.com/package/@frostr/bifrost" },
      { label: "View on GitHub", url: "https://github.com/FROSTR-ORG/bifrost" }
    ],
    icon: <Library className="w-8 h-8 text-[#00f0ff]" />,
    type: "Library"
  },
  {
    title: "Igloo Core",
    description: "A TypeScript library providing core functionality for FROSTR/Bifrost distributed key management and remote signing. Abstracts the complexity of threshold signatures and provides a clean, strongly-typed API.",
    links: [
      { label: "View on npm", url: "https://www.npmjs.com/package/@frostr/igloo-core" },
      { label: "View on GitHub", url: "https://github.com/frostr-org/igloo-core" }
    ],
    icon: <Library className="w-8 h-8 text-[#00f0ff]" />,
    type: "Library"
  },
  {
    title: "nostr-connect",
    description: "Lightweight opinionated implementation of NIP46 (nostr connect) signing standard.",
    links: [
      { label: "View on npm", url: "https://www.npmjs.com/package/@cmdcode/nostr-connect" },
      { label: "View on GitHub", url: "https://github.com/frostr-org/nostr-connect" }
    ],
    icon: <Library className="w-8 h-8 text-[#00f0ff]" />,
    type: "Library"
  }
];

const legacyItems = [
  {
    title: "Frostr Web Demo",
    description: "A basic web demonstration of a FROSTR node in action. Try it live or explore the source code.",
    links: [
      { label: "View Live Demo", url: "https://frostr-org.github.io/web-demo/" },
      { label: "View on GitHub", url: "https://github.com/FROSTR-ORG/web-demo" }
    ],
    icon: <Globe className="w-8 h-8 text-[#00f0ff]" />,
    type: "Web App"
  }
];

const getAppTypeStyles = (type) => {
  switch (type) {
    case "Desktop App":
      return "text-[#00ff95] bg-[#00ff9515]";
    case "Browser Extension":
      return "text-[#ff9500] bg-[#ff950015]";
    case "Web App":
      return "text-[#00f0ff] bg-[#00f0ff15]";
    case "Server":
      return "text-[#ff0095] bg-[#ff009515]";
    case "CLI Tool":
      return "text-[#b47aff] bg-[#b47aff15]";
    case "Library":
      return "text-[#ffdd00] bg-[#ffdd0015]";
    case "Mobile App":
      return "text-[#00ffb3] bg-[#00ffb315]";
    default:
      return "text-gray-300 bg-gray-700";
  }
};

function Apps() {
  return (
    <Card className="border-0 bg-[#161f33]/40 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
      <CardHeader className="border-b border-[#ffffff0f]">
        <h2 className="text-2xl font-semibold text-gray-200">FROSTR Applications</h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appItems.map((appItem, index) => (
            <a
              key={index}
              href={appItem.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="block transform hover:scale-[1.02] transition-all duration-300"
            >
              <Card className="h-full border-0 bg-[#ffffff05] hover:bg-[#ffffff08] transition-colors overflow-hidden flex flex-col">
                <CardContent className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {appItem.icon}
                      <h3 className="text-xl font-semibold text-gray-200">{appItem.title}</h3>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getAppTypeStyles(appItem.type)}`}>
                      {appItem.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-grow">{appItem.description}</p>
                  <div className="mt-auto pt-4 space-y-2">
                    {appItem.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#00f0ff] hover:text-[#00ff95] transition-colors text-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* Libraries Section */}
        <div className="mt-10 pt-8 border-t border-[#ffffff0f]">
          <h3 className="text-xl font-semibold text-gray-200 mb-4">Libraries</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {libraryItems.map((item, index) => (
              <a
                key={index}
                href={item.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transform hover:scale-[1.02] transition-all duration-300"
              >
                <Card className="h-full border-0 bg-[#ffffff05] hover:bg-[#ffffff08] transition-colors overflow-hidden flex flex-col">
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <h3 className="text-xl font-semibold text-gray-200">{item.title}</h3>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getAppTypeStyles(item.type)}`}>
                        {item.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-grow">{item.description}</p>
                    <div className="mt-auto pt-4 space-y-2">
                      {item.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#00f0ff] hover:text-[#00ff95] transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Legacy Section */}
        <div className="mt-10 pt-8 border-t border-[#ffffff0f]">
          <h3 className="text-lg font-medium text-gray-500 mb-4">Legacy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
            {legacyItems.map((appItem, index) => (
              <a
                key={index}
                href={appItem.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transform hover:scale-[1.02] transition-all duration-300"
              >
                <Card className="h-full border-0 bg-[#ffffff05] hover:bg-[#ffffff08] transition-colors overflow-hidden flex flex-col">
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {appItem.icon}
                        <h3 className="text-xl font-semibold text-gray-200">{appItem.title}</h3>
                      </div>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getAppTypeStyles(appItem.type)}`}>
                        {appItem.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 line-clamp-3 mb-4 flex-grow">{appItem.description}</p>
                    <div className="mt-auto pt-4 space-y-2">
                      {appItem.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#00f0ff] hover:text-[#00ff95] transition-colors text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Apps; 
