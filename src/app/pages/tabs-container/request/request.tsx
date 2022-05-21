// import { json } from '@codemirror/lang-json';
// import { oneDark } from '@codemirror/theme-one-dark';
import { Container, styled, Text } from '@nextui-org/react';
// import CodeMirror from '@uiw/react-codemirror';
import React from 'react';

import { DraggableTabs } from '../../../components';

const StyledRequestHeader = styled('div', {
  border: 'solid $accents1',
  borderLeft: '0px',
  borderRight: '0px',
  backgroundColor: '$backgroundContrast',
});

export const Request: React.FC = () => {
  const tabs = [
    {
      id: '1',
      title: 'Request',
      active: true,
      content: (
        <Container gap={0} fluid css={{ height: '100%', paddingTop: 20 }}>
          <Text> test </Text>
        </Container>
      ),
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
    // <Container gap={0} fluid css={{ display: 'flex', flexDirection: 'column' }}>
    <StyledRequestHeader>
      <DraggableTabs
        tabs={tabs}
        // activeKey={getActiveTabId()}
        // onActivate={activateTab}
        // onAdd={() => create({ title: 'New Tab' })}
        // onClose={closeTab}
        // onDragEnd={({ active, over }) => moveTab(active.id, over?.id)}
      />
    </StyledRequestHeader>
    /* <Container gap={0} fluid css={{ display: 'flex' }}>
      <CodeMirror
        value="console.log('hello world!');"
        height="500px"
        width="500px"
        theme={oneDark}
        extensions={[json()]}
      />
    </Container> */
    // </Container>
  );
};
