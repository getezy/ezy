import { styled } from '@nextui-org/react';
import React from 'react';
import { Tabs as ReactTabs } from 'react-tabs';

import { Tab, TabProps } from './Tab';
import { TabList } from './TabList';

// @ts-ignore
const StyledTabs = styled(ReactTabs, {
  '& ul': {
    marginLeft: 0,
    marginRight: 0,
  },
});

export interface TabsProps {
  tabs: TabProps[];

  children?: React.ReactNode;

  defaultIndex?: number;

  onSelect?: (index: number, previousIndex: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, children, defaultIndex = 0, onSelect }) => (
  <StyledTabs defaultIndex={defaultIndex} onSelect={onSelect}>
    <TabList>
      {tabs.map((tab) => (
        <Tab key={tab.id} {...tab} />
      ))}
    </TabList>

    {children}
  </StyledTabs>
);
