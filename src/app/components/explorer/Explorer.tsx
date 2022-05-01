import { Container, CSS, Grid } from '@nextui-org/react';
import React from 'react';

import { ExplorerHeader } from './ExplorerHeader';

const ExplorerGridStyles: CSS = {
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  height: '100vh',
  margin: 0,
  width: '250px',
  background: '$backgroundContrast',
  borderRight: 'solid $accents2 1px',
};

export interface ExplorerProps {
  children: React.ReactNode;
  header: React.ReactNode;
  menu: React.ReactNode;
}

export const Explorer: React.FC<ExplorerProps> = ({ children, header, menu }) => (
  <Grid.Container>
    <Grid css={ExplorerGridStyles}>
      <ExplorerHeader>{header}</ExplorerHeader>
      <Container fluid gap={0}>
        {menu}
      </Container>
    </Grid>
    <Grid css={{ display: 'flex', flex: 1 }}>{children}</Grid>
  </Grid.Container>
);
