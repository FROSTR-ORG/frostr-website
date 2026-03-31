import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { glossaryMeta, glossarySections } from '@/assets/glossary';
import PropTypes from 'prop-types';

const glossaryEntryShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  term: PropTypes.string.isRequired,
  aliases: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string.isRequired
});

const glossarySectionShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  entries: PropTypes.arrayOf(glossaryEntryShape).isRequired
});

function renderInlineCode(text) {
  return text.split(/(`[^`]+`)/g).filter(Boolean).map((part, index) => {
    const key = `${part}-${index}`;

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={key}
          className="inline rounded bg-[#ffffff10] px-1.5 py-0.5 font-mono text-[0.95em] text-[#00ff95]"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={key}>{part}</span>;
  });
}

function GlossaryEntry({ entry }) {
  return (
    <div className="grid gap-2 py-5 md:grid-cols-[minmax(0,180px)_1fr] md:gap-6">
      <div className="space-y-2">
        <dt className="break-words text-lg font-semibold text-gray-100">
          {renderInlineCode(entry.term)}
        </dt>
        {entry.aliases?.length > 0 && (
          <p className="text-sm text-gray-500">
            Also: {entry.aliases.map((alias, index) => (
              <span key={`${entry.id}-alias-${alias}`}>
                {renderInlineCode(alias)}
                {index < entry.aliases.length - 1 ? ', ' : null}
              </span>
            ))}
          </p>
        )}
      </div>

      <dd className="leading-relaxed text-gray-300">{renderInlineCode(entry.description)}</dd>
    </div>
  );
}

GlossaryEntry.propTypes = {
  entry: glossaryEntryShape.isRequired
};

function GlossarySection({ section }) {
  return (
    <Card
      id={section.id}
      className="border-0 bg-[#161f33]/40 shadow-2xl backdrop-blur-xl"
    >
      <CardHeader className="border-b border-[#ffffff0f]">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-100">{section.title}</h2>
          <p className="text-sm text-gray-400">{section.description}</p>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <dl className="divide-y divide-[#ffffff0f]">
          {section.entries.map((entry) => (
            <GlossaryEntry key={entry.id} entry={entry} />
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}

GlossarySection.propTypes = {
  section: glossarySectionShape.isRequired
};

function Glossary() {
  return (
    <div className="space-y-8">
      <Card className="border-0 bg-[#161f33]/40 shadow-2xl backdrop-blur-xl">
        <CardHeader className="border-b border-[#ffffff0f]">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.18em] text-[#00f0ff]">Simple Reference</p>
              <h1 className="text-3xl font-semibold text-gray-100 md:text-4xl">FROSTR Glossary</h1>
            </div>

            <p className="max-w-4xl text-base leading-relaxed text-gray-300">
              {glossaryMeta.intro}
            </p>

            <p className="max-w-4xl text-sm leading-relaxed text-gray-500">
              {glossaryMeta.note}
            </p>
          </div>
        </CardHeader>
      </Card>

      {glossarySections.map((section) => (
        <GlossarySection key={section.id} section={section} />
      ))}
    </div>
  );
}

export default Glossary;
