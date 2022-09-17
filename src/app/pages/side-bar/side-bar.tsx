import { styled } from '@nextui-org/react';
import React from 'react';

import { CollectionsTree } from './collections-tree';
import { Header } from './header';

const SideBarWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  minWidth: 250,
  maxWidth: 250,
  background: '$background',
  borderRight: 'solid $border 1px',
});

const HeaderWrapper = styled('div', {
  background: '$background',
  borderBottom: 'solid $border 1px',
  paddingTop: 10,
  paddingBottom: 10,
});

export const SideBar: React.FC = () => (
  <SideBarWrapper>
    <HeaderWrapper>
      <Header />
    </HeaderWrapper>
    <CollectionsTree />
  </SideBarWrapper>
);
