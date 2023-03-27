import React from 'react';

import { Tab, Tabs } from '@components';
import { TabType } from '@core';
import { useTabsStore } from '@new-storage';

import { GrpcRequestTab } from './tab-types';
import { WelcomeContainer } from './welcome';

export const TabsContainer = (): JSX.Element => {
  const { tabs, activeTabId, activateTab, closeTab, moveTab } = useTabsStore((store) => store);

  const tabsContent = tabs.map((tab) => (
    <Tab title={tab.title} id={tab.id} key={tab.id} closable>
      {tab.type === TabType.GrpcRequest && <GrpcRequestTab tabId={tab.id} />}
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
      {tabsContent}
    </Tabs>
  ) : (
    <WelcomeContainer />
  );
};
