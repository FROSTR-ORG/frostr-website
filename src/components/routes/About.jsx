import { Card, CardHeader, CardContent } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PropTypes from 'prop-types';

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

function About({ orgData }) {
  return (
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
}

About.propTypes = {
  orgData: PropTypes.object
};

export default About; 