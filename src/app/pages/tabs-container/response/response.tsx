import { styled } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '../../../components';

const data = [
  {
    title: 'Response',
    tabKey: nanoid(),
    key: nanoid(),
  },
];

const StyledContainer = styled('div', {
  borderLeft: 'solid 1px $border',
  width: '100%',
});

export const Response: React.FC = () => {
  const tabs = data.map((tab) => (
    <Tab title={tab.title} id={tab.tabKey} key={tab.key}>
      <CodeEditor readOnly maxWidth="100%" height="calc(100vh - 155px)" />
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
