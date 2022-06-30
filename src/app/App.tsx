import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

import { Main } from './pages';
import { ThemeType, useSettingsStore } from './storage';
import { darkTheme, globalStyles, lightTheme } from './themes';

function App(): JSX.Element {
  const theme = useSettingsStore((state) => state.type) === ThemeType.Dark ? darkTheme : lightTheme;

  globalStyles();

  return (
    <NextUIProvider theme={theme}>
      <Main />
    </NextUIProvider>
  );
}

export default App;
