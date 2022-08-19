import { styled } from '@nextui-org/react';

export const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',
});

export const ListWrapper = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  margin: 0,

  overflow: 'auto',

  backgroundColor: '$background',
});
