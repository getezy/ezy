import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { NextUIProvider, Grid } from '@nextui-org/react';

import { darkTheme } from './themes';
import { Explorer } from './components';

function App() {
  return (
    <NextUIProvider theme={darkTheme}>
      <Grid.Container css={{ height: '100vh' }}>
        <Grid xs={4}>
          <Explorer />
        </Grid>
      </Grid.Container>
    </NextUIProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(App());
