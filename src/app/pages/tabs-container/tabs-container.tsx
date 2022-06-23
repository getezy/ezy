import { Container, Spacer } from '@nextui-org/react';
import React from 'react';

import { ResizablePanel, Tab, Tabs } from '../../components';
import { useTabsStore } from '../../storage';
import { Request } from './request';
import { Response } from './response';
import { SendHeader } from './send-header';

export const TabsContainer = (): JSX.Element => {
  const { activeTabId, closeTab, activateTab, moveTab } = useTabsStore((store) => store);

  const tabs = useTabsStore((store) => store.tabs).map((tab) => (
    <Tab title={tab.title} id={tab.id} key={tab.id} closable>
      <Container gap={0} fluid css={{ paddingTop: 20 }}>
        <SendHeader />
        <Spacer />
        <ResizablePanel firstNode={<Request tab={tab} />} secondNode={<Response tab={tab} />} />
      </Container>
    </Tab>
  ));

  return (
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
  );
};
