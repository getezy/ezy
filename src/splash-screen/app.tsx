import { Badge, Container, NextUIProvider, Text } from '@nextui-org/react';
import React from 'react';

import { Logo } from './logo';
import { DarkTheme, globalStyles } from './themes';

function App(): JSX.Element {
  globalStyles();

  return (
    <NextUIProvider theme={DarkTheme}>
      <Container fluid display="flex" justify="center" alignItems="center" css={{ height: '100%' }}>
        <Container
          display="flex"
          justify="space-between"
          alignItems="center"
          wrap="nowrap"
          css={{ position: 'absolute', top: 0 }}
        >
          <Text
            b
            css={{
              fontFamily: '$sans',
              fontSize: 48,
              lineHeight: '58px',
              textGradient: '124.13deg, #FFFFFF -40.93%, rgba(142, 142, 142, 0) 185.11%',
            }}
          >
            ezy.
          </Text>
          <Badge variant="points" size="xs" isSquared css={{ backgroundColor: 'transparent' }} />
        </Container>
        <Logo />
        <Container
          display="flex"
          justify="center"
          alignItems="center"
          css={{ position: 'absolute', bottom: 10 }}
        >
          <Text size="$sm" css={{ color: '$accents8' }}>
            Preparing update
          </Text>
        </Container>
      </Container>
    </NextUIProvider>
  );
}

export default App;
