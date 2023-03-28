import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRegisterActions } from '@getezy/kbar';
import React from 'react';

import { Theme } from '@core';
import { useAppStorage } from '@new-storage';

export function useThemeActions() {
  const { setTheme } = useAppStorage((store) => store);

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
      perform: () => setTheme(Theme.DARK),
    },
    {
      id: 'lightTheme',
      name: 'Light',
      keywords: 'light theme',
      parent: 'theme',
      perform: () => setTheme(Theme.LIGHT),
    },
  ]);
}
