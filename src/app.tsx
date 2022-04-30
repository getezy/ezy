import { Container, Grid, NextUIProvider, Row } from '@nextui-org/react';
import * as React from 'react';

import { Explorer, Header, ResponseViewer } from './components';
import { darkTheme } from './themes';

export function App() {
  return (
    <NextUIProvider theme={darkTheme}>
      <Grid.Container>
        <Grid xs={3} css={{ alignItems: 'stretch' }}>
          <Explorer />
        </Grid>
        <Grid xs={9}>
          <Container>
            <Row>
              <Header />
            </Row>
            <Row>
              <ResponseViewer />
            </Row>
          </Container>
        </Grid>
      </Grid.Container>
    </NextUIProvider>
  );
}
