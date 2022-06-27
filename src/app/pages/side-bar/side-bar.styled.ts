import { styled } from '@nextui-org/react';

export const StyledSideBar = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  userSelect: 'none',
  overflow: 'auto',

  height: 'calc(100vh - 50px)',
  width: 250,

  margin: 0,
  '&::-webkit-scrollbar': {
    width: 2,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '$accents1',
  },
  '&::-webkit-scrollbar-thumb': {
    boxShadow: 'inset 0 0 6px',
    color: '$accents5',
  },
});
