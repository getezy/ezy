import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

import { NotificationContainer } from '@components';
import { ThemeType, useSettingsStore } from '@storage';

import { Main } from './pages';
import { DarkTheme, globalStyles, LightTheme } from './themes';

export const THEMES = {
  [ThemeType.DARK]: DarkTheme,
  [ThemeType.LIGHT]: LightTheme,
};

function App(): JSX.Element {
  const theme = useSettingsStore((store) => store.theme);

  globalStyles();

  return (
    theme && (
      <NextUIProvider theme={THEMES[theme]}>
        <NotificationContainer />
        <Main />
      </NextUIProvider>
    )
  );
}

export default App;
