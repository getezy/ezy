import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRegisterActions } from '@getezy/kbar';
import React from 'react';

import { ThemeType, useSettingsStore } from '@new-storage';

export function useThemeActions() {
  const { setTheme } = useSettingsStore((store) => store);

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
      perform: () => setTheme(ThemeType.DARK),
    },
    {
      id: 'lightTheme',
      name: 'Light',
      keywords: 'light theme',
      parent: 'theme',
      perform: () => setTheme(ThemeType.LIGHT),
    },
  ]);
}
