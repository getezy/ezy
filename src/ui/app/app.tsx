import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

import { NotificationContainer } from '@components';
import { Theme } from '@core';
import { useAppStorage } from '@new-storage';
import { DarkTheme, LightTheme } from '@themes';

import { Main } from './pages';
import { globalStyles } from './styles';

export const THEMES = {
  [Theme.DARK]: DarkTheme,
  [Theme.LIGHT]: LightTheme,
};

function App(): JSX.Element {
  const { theme, fetch } = useAppStorage((store) => store);

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
