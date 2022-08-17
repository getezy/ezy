import { createTheme } from '@nextui-org/react';

export const LightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      gradient: 'linear-gradient(112deg, $yellow400 -25%, $yellow600 30%, $cyan600 90%)',
    },
  },
});
