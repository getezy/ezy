import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

import { ThemeType, useSettingsStore } from './storage';
import { darkTheme, lightTheme } from './themes';

// @ts-ignore
function App(): JSX.Element {
  const theme = useSettingsStore((state) => state.type) === ThemeType.Dark ? darkTheme : lightTheme;

  return <NextUIProvider theme={theme} />;
}

export default App;
