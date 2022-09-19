import { createTheme } from '@nextui-org/react';

export const DarkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      background: '#202225',
      backgroundContrast: '#292b2f',
      selection: 'rgba(166, 198, 224, 0.2)',
      ezy: '#acc917',
      gradient: 'linear-gradient(112deg, #acc917 -25%, #4f680f 90%)',
    },
  },
});
