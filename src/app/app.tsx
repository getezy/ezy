import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

import { NotificationContainer } from '@components';
import { Theme } from '@database/types';
import { useSettingsStore } from '@new-storage';

import { Main } from './pages';
import { DarkTheme, globalStyles, LightTheme } from './themes';

export const THEMES = {
  [Theme.DARK]: DarkTheme,
  [Theme.LIGHT]: LightTheme,
};

function App(): JSX.Element {
  const { theme, fetch } = useSettingsStore((store) => store);

  React.useEffect(() => {
    fetch();
  }, []);

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
