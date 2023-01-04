import React from 'react';

import { AppContext } from '@context';

export enum ShortcutsGroup {
  WELCOME = 'welcome',
  RESPONSE = 'response',
}

const shortcuts = [
  {
    key: {
      darwin: '⌘+K',
      other: 'Ctrl+K',
    },
    description: 'Open command bar',
    groups: [ShortcutsGroup.WELCOME],
  },
  {
    key: {
      darwin: '⌘+Shift+C',
      other: 'Ctrl+Shift+C',
    },
    description: 'Create new collection',
    groups: [ShortcutsGroup.WELCOME],
  },
  {
    key: {
      darwin: '⌘+Shift+S',
      other: 'Ctrl+Shift+S',
    },
    description: 'Synchronize collections',
    groups: [ShortcutsGroup.WELCOME],
  },
  {
    key: {
      darwin: '⌘+T',
      other: 'Ctrl+T',
    },
    description: 'New gRPC tab',
    groups: [ShortcutsGroup.WELCOME],
  },
  {
    key: {
      darwin: '⌘+Enter',
      other: 'Ctrl+Enter',
    },
    description: 'Invoke request',
    groups: [ShortcutsGroup.RESPONSE],
  },
];

export function useShortcuts() {
  const context = React.useContext(AppContext);

  const shortcutsMemoized = React.useMemo(
    () =>
      shortcuts.map((shortcut) => ({
        key: context?.platform.os === 'darwin' ? shortcut.key.darwin : shortcut.key.other,
        description: shortcut.description,
        groups: shortcut.groups,
      })),
    [context?.platform.os]
  );

  function getShortcuts(group: ShortcutsGroup) {
    return shortcutsMemoized.filter((shortcut) => shortcut.groups.includes(group));
  }

  return { getShortcuts };
}
