import { Col, Container, Row, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { Kbd } from '@components';
import { ShortcutsGroup, useShortcuts } from '@hooks';

export const WelcomeContainer: React.FC = () => {
  const { getShortcuts } = useShortcuts();

  const shortcuts = getShortcuts(ShortcutsGroup.WELCOME);

  return (
    <Container
      display="flex"
      justify="center"
      alignItems="center"
      wrap="nowrap"
      direction="row"
      css={{ userSelect: 'none' }}
    >
      <Container gap={0} display="flex" direction="column" wrap="nowrap" css={{ width: 400 }}>
        {shortcuts.map((shortcut) => (
          <Row gap={0} key={shortcut.key}>
            <Col>
              <Text size="$sm" css={{ color: '$accents8' }}>
                {shortcut.description}
              </Text>
            </Col>
            <Col>
              <Kbd key={shortcut.key} size="sm">
                {shortcut.key}
              </Kbd>
            </Col>
            <Spacer y={1.5} />
          </Row>
        ))}
      </Container>
    </Container>
  );
};
