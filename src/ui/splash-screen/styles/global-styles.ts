import { globalCss } from '@nextui-org/react';

export const globalStyles = globalCss({
  '#root > div': {
    height: '100vh',
    width: '100vw',
  },

  // For displaying toasts on top of modals
  '.nextui-backdrop': {
    zIndex: '9998 !important',
  },
});
