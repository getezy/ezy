import { styled } from '@nextui-org/react';

export const StyledSideBar = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  userSelect: 'none',

  height: 'calc(100vh - 50px)',
  width: 250,

  margin: 0,
});
