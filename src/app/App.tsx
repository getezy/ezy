import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

import { NotificationContainer } from './components';
import { Main } from './pages';
import { ThemeType, useSettingsStore } from './storage';
import { DarkTheme, globalStyles, LightTheme } from './themes';

function App(): JSX.Element {
  const theme = useSettingsStore((store) => store.type) === ThemeType.Dark ? DarkTheme : LightTheme;

  globalStyles();

  return (
    <NextUIProvider theme={theme}>
      <NotificationContainer />
      <Main />
    </NextUIProvider>
  );
}

export default App;
