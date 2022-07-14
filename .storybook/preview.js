import { NextUIProvider } from '@nextui-org/react';

import { DarkTheme, LightTheme } from '../src/app/themes';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'Dark',
    toolbar: {
      icon: 'circlehollow',
      items: [
        'Light',
        'Dark',
      ],
    },
  },
};

const THEMES = {
  'Dark': DarkTheme,
  'Light': LightTheme,
};

function getTheme(theme) {
  if (!THEMES[theme]) {
    throw new Error(`No theme ${theme}`);
  }

  return THEMES[theme];
}


const withThemeProvider = (Story, context) => {
  const theme = getTheme(context.globals.theme);

  return (
    <>
      <NextUIProvider
        theme={theme}
      >
        <Story />
      </NextUIProvider>
    </>
  );
};

export const decorators = [withThemeProvider];
