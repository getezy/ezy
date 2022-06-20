import { styled } from '@nextui-org/react';

export const StyledTabBar = styled('div', {
  position: 'relative',
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'auto',

  '&::-webkit-scrollbar': {
    width: 2,
    height: 2,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '$accents1',
  },
  '&::-webkit-scrollbar-thumb': {
    boxShadow: 'inset 0 0 6px',
    color: '$accents5',
  },

  background: '$backgroundContrast',
});
