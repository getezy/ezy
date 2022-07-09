import { Container, Spacer, styled, Text } from '@nextui-org/react';
import React from 'react';

import { ResizablePanel, Tab, Tabs } from '../../components';
import { useTabsStore } from '../../storage';
import { Request } from './request';
import { Response } from './response';
import { SendHeader } from './send-header';

const NoTabsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

export const TabsContainer = (): JSX.Element => {
  const { activeTabId, closeTab, activateTab, moveTab } = useTabsStore((store) => store);

  const tabs = useTabsStore((store) => store.tabs).map((tab) => (
    <Tab title={tab.title} id={tab.id} key={tab.id} closable>
      <Container gap={0} fluid css={{ paddingTop: 20 }}>
        <SendHeader tabId={tab.id} />
        <Spacer />
        <ResizablePanel
          firstNode={<Request tabId={tab.id} />}
          secondNode={<Response tabId={tab.id} />}
        />
      </Container>
    </Tab>
  ));

  return tabs.length ? (
    <Tabs
      draggable
      activeKey={activeTabId}
      onTabActivate={activateTab}
      onTabClose={closeTab}
      onTabDragEnd={moveTab}
      activeBar={{ color: 'warning', position: 'bottom' }}
    >
      {tabs}
    </Tabs>
  ) : (
    <NoTabsContainer>
      <Text css={{ color: '$accents6', userSelect: 'none' }}>No tabs</Text>
    </NoTabsContainer>
  );
};
