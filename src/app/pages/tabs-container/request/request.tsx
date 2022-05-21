import { Container, Text } from '@nextui-org/react';
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
      content: (
        <Container gap={0} fluid css={{ height: '100%', paddingTop: 20 }}>
          <Text> test2 </Text>
        </Container>
      ),
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
