import { nanoid } from 'nanoid';
import React from 'react';

import { CodeEditor, DraggableTabs } from '../../../components';

export const Request: React.FC = () => {
  const tabs = [
    {
      id: nanoid(),
      title: 'Request',
      active: true,
      content: <CodeEditor />,
    },
    {
      id: nanoid(),
      title: 'Metadata',
      active: false,
      content: <CodeEditor />,
    },
  ];

  // for horizontal alignment height: 100%
  return <DraggableTabs tabs={tabs} css={{ width: '100%' }} />;
};
