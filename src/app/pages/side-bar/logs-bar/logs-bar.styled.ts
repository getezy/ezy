import { styled } from '@nextui-org/react';

export const StyledLogs = styled('div', {
  borderTop: 'solid 1px $border',
  bottom: 0,
  height: 10,

  variants: {
    hasNewLogs: {
      true: {
        backgroundColor: '$error',
        '&:hover': {
          backgroundColor: '$errorShadow',
        },
      },
    },
  },
});
