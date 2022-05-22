import React from 'react';

import { CodeEditor, DraggableTabs } from '../../../components';

export const Request: React.FC = () => {
  const tabs = [
    {
      id: '1',
      title: 'Request',
      active: true,
      content: <CodeEditor />,
    },
    {
      id: '2',
      title: 'Metadata',
      active: false,
      content: <CodeEditor />,
    },
  ];

  return (
    <DraggableTabs
      tabs={tabs}
      // activeKey={getActiveTabId()}
      // onActivate={activateTab}
      // onClose={closeTab}
    />
  );
};
