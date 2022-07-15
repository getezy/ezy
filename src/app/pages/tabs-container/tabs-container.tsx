import { Container, styled, Text } from '@nextui-org/react';
import React from 'react';

import { Tab, Tabs } from '../../components';
import { CollectionType, useTabsStore } from '../../storage';
import { GrpcTabContainer } from './collection-types';

const NoTabsContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

export const TabsContainer = (): JSX.Element => {
  const { activeTabId, closeTab, activateTab, moveTab, tabs } = useTabsStore((store) => store);

  const tabsContent = tabs.map((tab) => (
    <Tab title={tab.title} id={tab.id} key={tab.id} closable>
      <Container gap={0} fluid css={{ paddingTop: 20 }}>
        {tab.type === CollectionType.GRPC && <GrpcTabContainer tab={tab} />}
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
      {tabsContent}
    </Tabs>
  ) : (
    <NoTabsContainer>
      <Text css={{ color: '$accents6', userSelect: 'none' }}>No tabs</Text>
    </NoTabsContainer>
  );
};
