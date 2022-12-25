import { Container, Text } from '@nextui-org/react';
import React from 'react';

import { Kbd } from '@components';
import { ShortcutsGroup, useShortcuts } from '@hooks';

export const EmptyResponseView: React.FC = () => {
  const { getShortcuts } = useShortcuts();

  const shortcuts = getShortcuts(ShortcutsGroup.RESPONSE);

  return (
    <Container display="flex">
      {shortcuts.map((shortcut) => (
        <Container
          key={shortcut.key}
          gap={0}
          display="flex"
          direction="column"
          justify="center"
          alignItems="center"
          wrap="nowrap"
        >
          <Text size="$sm" css={{ color: '$accents8' }}>
            {shortcut.description}
          </Text>
          <Kbd key={shortcut.key} size="sm">
            {shortcut.key}
          </Kbd>
        </Container>
      ))}
    </Container>
  );
};
