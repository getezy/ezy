import { nanoid } from 'nanoid';
import React from 'react';

import { CodeEditor, DraggableTabs } from '../../../components';

export const Response: React.FC = () => {
  const tabs = [
    {
      id: nanoid(),
      title: 'Response',
      active: true,
      content: <CodeEditor />,
    },
  ];

  // for horizontal alignment height: 100%
  return <DraggableTabs tabs={tabs} css={{ borderLeft: 'solid 1px $accents2', width: '100%' }} />;
};
