import React from 'react';

import { Tab, Tabs } from '@components';
import { CollectionType, useTabsStore } from '@storage';

import { GrpcTabContainer } from './collection-types';
import { WelcomeContainer } from './welcome';

export const TabsContainer = (): JSX.Element => {
  const { activeTabId, closeTab, activateTab, moveTab, tabs } = useTabsStore((store) => store);

  const tabsContent = tabs.map((tab) => (
    <Tab title={tab.title} id={tab.id} key={tab.id} closable>
      {tab.type === CollectionType.GRPC && <GrpcTabContainer tab={tab} />}
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
