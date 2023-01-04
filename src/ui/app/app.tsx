import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

import { NotificationContainer } from '@components';
import { Theme } from '@database';
import { useStorageFetch } from '@hooks';
import { useSettingsStore } from '@new-storage';
import { DarkTheme, LightTheme } from '@themes';

import { Main } from './pages';
import { globalStyles } from './styles';

export const THEMES = {
  [Theme.DARK]: DarkTheme,
  [Theme.LIGHT]: LightTheme,
};

function App(): JSX.Element {
  const fetchStorage = useStorageFetch();
  const { theme } = useSettingsStore((store) => store);

  React.useEffect(() => {
    fetchStorage();
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
