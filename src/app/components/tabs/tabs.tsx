import { styled } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { TabProps } from './tab';
import { TabBar, TabBarProps } from './tab-bar';
import { TabContent } from './tab-content';

const StyledTabs = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});

export type TabsProps = PropsWithChildren<TabBarProps>;

export const Tabs: React.FC<TabsProps> = ({
  children,
  activeBar,
  activeKey,
  draggable,
  onTabActivate,
  onTabClose,
  onTabDragEnd,
}) => {
  const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];

  const tabsContents = React.useMemo(
    () =>
      tabs.map((tab) => (
        <TabContent active={activeKey === tab.props.id} key={tab.key}>
          {tab}
        </TabContent>
      )),
    [activeKey]
  );

  return (
    <StyledTabs>
      <TabBar
        activeKey={activeKey}
        activeBar={activeBar}
        draggable={draggable}
        onTabActivate={onTabActivate}
        onTabClose={onTabClose}
        onTabDragEnd={onTabDragEnd}
      >
        {children}
      </TabBar>
      {tabsContents}
    </StyledTabs>
  );
};
