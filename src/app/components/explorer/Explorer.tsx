import { Container, CSS, Grid } from '@nextui-org/react';
import React from 'react';

import { ExplorerHeader } from './ExplorerHeader';

const ExplorerGridStyles: CSS = {
  margin: 0,
  minWidth: '250px',
  background: '$backgroundContrast',
  borderRight: 'solid $accents2 1px',
};

export interface ExplorerProps {
  children: React.ReactNode;
  header: React.ReactNode;
  menu: React.ReactNode;
}

export const Explorer: React.FC<ExplorerProps> = ({ children, header, menu }) => (
  <Grid.Container wrap="nowrap">
    <Grid css={ExplorerGridStyles}>
      <ExplorerHeader>{header}</ExplorerHeader>
      <Container fluid gap={0} css={{ width: '100%', margin: 0, padding: 0 }}>
        {menu}
      </Container>
    </Grid>
    <Grid css={{ width: '100%' }}>{children}</Grid>
  </Grid.Container>
);
