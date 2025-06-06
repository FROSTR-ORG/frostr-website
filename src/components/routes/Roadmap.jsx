import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Network, Binary } from 'lucide-react';
import PropTypes from 'prop-types';

function Roadmap({ projectData }) {
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

  if (!projectData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-300">Loading roadmap...</p>
      </div>
    );
  }

  return (
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
  );
}

Roadmap.propTypes = {
  projectData: PropTypes.object
};

export default Roadmap; 