import { Col, Container, Row, Spacer, Text } from '@nextui-org/react';
import React from 'react';

import { Kbd } from '@components';
import { AppContext } from '@context';

const getShortcuts = (os: string) => {
  const shortcuts = [
    {
      key: {
        darwin: '⌘+K',
        other: 'Ctrl+K',
      },
      description: 'Open command bar',
    },
    {
      key: {
        darwin: '⌘+Shift+C',
        other: 'Ctrl+Shift+C',
      },
      description: 'Create new collection',
    },
    {
      key: {
        darwin: '⌘+Shift+S',
        other: 'Ctrl+Shift+S',
      },
      description: 'Synchronize collections',
    },
    {
      key: {
        darwin: '⌘+T',
        other: 'Ctrl+T',
      },
      description: 'New gRPC tab',
    },
  ];

  return shortcuts.map((shortcut) => ({
    key: os === 'darwin' ? shortcut.key.darwin : shortcut.key.other,
    description: shortcut.description,
  }));
};

export const WelcomeContainer: React.FC = () => {
  const context = React.useContext(AppContext);

  const shortcuts = getShortcuts(context?.platform.os || 'darwin');

  return (
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
          <Row key={shortcut.key}>
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
};
