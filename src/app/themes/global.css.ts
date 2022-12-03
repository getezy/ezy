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

  '::-webkit-scrollbar': {
    height: 2,
    width: 2,
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '$backgroundContrast',
  },
  '::-webkit-scrollbar-thumb': {
    boxShadow: 'inset 0 0 6px',
    color: '$accents5',
  },
  '::-webkit-scrollbar-corner': {
    backgroundColor: '$backgroundContrast',
  },
});
