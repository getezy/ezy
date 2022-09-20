import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeType, useSettingsStore } from '@storage';
import { useRegisterActions } from 'kbar';
import React from 'react';

export function useThemeActions() {
  const { updateTheme } = useSettingsStore((store) => store);

  useRegisterActions([
    {
      id: 'theme',
      section: 'Settings',
      name: 'Change Theme',
      icon: <FontAwesomeIcon icon={faPalette} />,
    },
    {
      id: 'darkTheme',
      name: 'Dark',
      keywords: 'dark theme',
      parent: 'theme',
      perform: () => updateTheme(ThemeType.DARK),
    },
    {
      id: 'lightTheme',
      name: 'Light',
      keywords: 'light theme',
      parent: 'theme',
      perform: () => updateTheme(ThemeType.LIGHT),
    },
  ]);
}
