import { styled } from '@nextui-org/react';

export const TabBarWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden',
});

export const TabBarRightNodeWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  marginLeft: 'auto',
});

export const StyledTabBar = styled('div', {
  position: 'relative',
  display: 'flex',
  flex: 1,
  flexWrap: 'nowrap',
  overflow: 'auto',

  background: '$background',
});
