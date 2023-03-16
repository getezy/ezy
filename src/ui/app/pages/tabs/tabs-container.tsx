import { Button, Text } from '@nextui-org/react';
import React from 'react';

// import { Tab, Tabs } from '@components';
import { TabType } from '@core';
import { useTabsStore } from '@new-storage';

// import { GrpcRequestTab } from './tab-types';
// import { WelcomeContainer } from './welcome';

export const TabsContainer = (): JSX.Element => {
  const { tabs, create } = useTabsStore((store) => store);

  // console.log(tabs);

  const click = () => {
    create({ title: 'title', type: TabType.GrpcRequest });
    // console.log('test', tabs);
  };
  // const { activeTabId, closeTab, activateTab, moveTab, tabs } = useTabsStore((store) => store);

  // const tabsContent = container.tabs.map((tab) => (
  //   <Tab title={tab.title} id={tab.id} key={tab.id} closable>
  //     {tab.type === TabType.GrpcRequest && <GrpcRequestTab />}
  //   </Tab>
  // ));

  // return container.tabs.length ? (
  //   <Tabs
  //     draggable
  //     activeKey={activeTabId}
  //     onTabActivate={activateTab}
  //     onTabClose={closeTab}
  //     onTabDragEnd={moveTab}
  //     activeBar={{ color: 'warning', position: 'bottom' }}
  //   >
  //     {tabsContent}
  //   </Tabs>
  // ) : (
  //   <WelcomeContainer />
  // );

  return (
    <div>
      <Button onClick={click}>test</Button>
      {tabs.map((tab) => (
        <Text key={tab.id}>{`${tab.id} ${tab.type}`}</Text>
      ))}
    </div>
  );
};
