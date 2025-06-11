import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ExternalLink, BookOpen, Music, Video as VideoIcon, Radio } from 'lucide-react';

const mediaItems = [
  {
    title: "Frostr Workshop - Bitcoin 2025 Vegas",
    thumbnail: "https://plebdevs-bucket.nyc3.cdn.digitaloceanspaces.com/images/frostr-vegas-workshop.png",
    description: "Austin & Topher's FROSTR workshop. Walking through the basics of the protocol and going through a live demo with the audience (signing a 6/12 nostr multisig note live!)",
    link: "https://www.youtube.com/watch?v=J1WG_InBsHg",
    source: "Bitcoin 2025",
    type: "Video"
  },
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

function Media() {
  return (
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
  );
}

export default Media; 