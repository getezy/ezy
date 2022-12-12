import { Container, Text } from '@nextui-org/react';
import React from 'react';

import { Kbd } from '@components';
import { ShortcutsGroup, useShortcuts } from '@hooks';

export const EmptyResponseView: React.FC = () => {
  const { getShortcuts } = useShortcuts();

  const shortcuts = getShortcuts(ShortcutsGroup.RESPONSE);

  return (
    <Container display="flex" direction="column" justify="center" alignItems="center">
      {shortcuts.map((shortcut) => (
        <>
          <Text size="$sm" css={{ color: '$accents8' }}>
            {shortcut.description}
          </Text>
          <Kbd key={shortcut.key} size="sm">
            {shortcut.key}
          </Kbd>
        </>
      ))}
    </Container>
  );
};
