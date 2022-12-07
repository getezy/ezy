import { Col, Container, Row, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { Kbd } from '@components';

const shortcuts = [
  {
    key: '⌘+K',
    description: 'Open command bar',
  },
  {
    key: '⌘+Shift+C',
    description: 'Create new collection',
  },
  {
    key: '⌘+Shift+S',
    description: 'Synchronize collections',
  },
  {
    key: '⌘+T',
    description: 'New gRPC tab',
  },
];

export const WelcomeContainer: React.FC = () => (
  <Container
    display="flex"
    justify="center"
    alignItems="center"
    wrap="nowrap"
    direction="row"
    css={{ userSelect: 'none' }}
  >
    <Container gap={0} display="flex" css={{ width: 400 }}>
      <Text size="$xl" css={{ color: '$accents9' }}>
        Shortcuts
      </Text>
      <Spacer y={2} />
      {shortcuts.map((shortcut) => (
        <Row>
          <Col>
            <Text size="$sm" css={{ color: '$accents8' }}>
              {shortcut.description}
            </Text>
          </Col>
          <Spacer x={2} />
          <Col>
            <Kbd key={shortcut.key}>{shortcut.key}</Kbd>
          </Col>
          <Spacer y={1.5} />
        </Row>
      ))}
    </Container>
  </Container>
);
