import { NotificationContainer } from '@components';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeType, useSettingsStore } from '@storage';
import React from 'react';

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
