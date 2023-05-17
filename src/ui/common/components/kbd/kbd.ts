import { styled } from '@nextui-org/react';

export const Kbd = styled('kbd', {
  padding: '4px 6px',
  background: 'rgba(0 0 0 / .1)',
  borderRadius: '4px',
  fontSize: '$$kbdFontSize',
  margin: 0,

  variants: {
    size: {
      xs: {
        $$kbdFontSize: '10px',
      },
      sm: {
        $$kbdFontSize: '$fontSizes$sm',
      },
      md: {
        $$kbdFontSize: '$fontSizes$md',
      },
      lg: {
        $$kbdFontSize: '$fontSizes$lg',
      },
      xl: {
        $$kbdFontSize: '$fontSizes$xl',
      },
    },
  },
});
