import { styled, Text } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { TabBar } from './tab-bar';

const StyledTabs = styled('div', {});

export interface TabsProps {
  draggable?: boolean;
}

export const Tabs: React.FC<PropsWithChildren<TabsProps>> = () => (
  <StyledTabs>
    <TabBar>
      <Text>New Tab</Text>
    </TabBar>
  </StyledTabs>
);
