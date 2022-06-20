import { styled } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '../../../components';
// import { useTabsStore } from '../../../storage';

const data = [
  {
    title: 'Request',
    tabKey: nanoid(),
    key: nanoid(),
  },
  {
    title: 'Metadata',
    tabKey: nanoid(),
    key: nanoid(),
  },
];

const StyledContainer = styled('div', {
  width: '100%',
  backgroundColor: '$backgroundContrast',
});

export const Request: React.FC = () => {
  // const { updateTab } = useTabsStore((store) => store);

  const tabs = data.map((tab) => (
    <Tab title={tab.title} id={tab.tabKey} key={tab.key}>
      <CodeEditor maxWidth="100%" height="calc(100vh - 155px)" />
    </Tab>
  ));

  return (
    // for horizontal alignment height: 100%
    <StyledContainer>
      <Tabs activeKey={tabs[0].props.id} activeBar={{ color: 'secondary' }}>
        {tabs}
      </Tabs>
    </StyledContainer>
  );
};
