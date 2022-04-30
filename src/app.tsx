import { NextUIProvider } from '@nextui-org/react';
import React from 'react';

import { ThemeType, useThemeStore } from './storage';
import { darkTheme, lightTheme } from './themes';

function App(): JSX.Element {
  const theme = useThemeStore((state) => state.type) === ThemeType.Dark ? darkTheme : lightTheme;

  return <NextUIProvider theme={theme} />;
}

export default App;
