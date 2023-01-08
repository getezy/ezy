import { Badge, Container, NextUIProvider, Text } from '@nextui-org/react';
import React from 'react';

import { DarkTheme } from '@themes';

import { ErrorModal } from './error.modal';
import { Logo } from './logo';
import { globalStyles } from './styles';

function App(): JSX.Element {
  globalStyles();

  const [loaderText, setLoaderText] = React.useState('Loading');
  const [error, setError] = React.useState<string | null>(null);
  const [errorModalVisible, setErrorModalVisible] = React.useState(true);

  React.useEffect(() => {
    window.splashScreen.handleLoaderTextChange((text) => {
      setLoaderText(text);
    });

    window.splashScreen.handleError((value) => {
      setError(value);
    });
  }, []);

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
              fontSize: 30,
              lineHeight: '58px',
              textGradient: '124.13deg, #FFFFFF -40.93%, rgba(142, 142, 142, 0) 185.11%',
            }}
          >
            ezy.
          </Text>
          <Badge
            variant="points"
            size="md"
            isSquared
            css={{ backgroundColor: 'transparent', paddingTop: 10 }}
          />
        </Container>
        <Logo />
        <Container
          display="flex"
          justify="center"
          alignItems="center"
          css={{ position: 'absolute', bottom: 10 }}
        >
          <Text size="$sm" css={{ color: '$accents8' }}>
            {loaderText}
          </Text>
        </Container>
      </Container>
      {error && (
        <ErrorModal
          preventClose
          open={errorModalVisible}
          error={error}
          onClose={() => setErrorModalVisible(false)}
        />
      )}
    </NextUIProvider>
  );
}

export default App;
