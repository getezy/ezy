import { CSS, Grid } from '@nextui-org/react';
import React from 'react';

import { ExplorerHeader } from './explorer-header';

const ExplorerGridStyles: CSS = {
  display: 'flex',
  flexWrap: 'nowrap',
  height: '100vh',
  margin: 0,
  width: '200px',
  background: '$backgroundContrast',
  borderRight: 'solid $accents2 1px',
};

export interface ExplorerProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export const Explorer: React.FC<ExplorerProps> = ({ children, header }) => (
  <Grid.Container>
    <Grid css={ExplorerGridStyles}>
      <ExplorerHeader>{header}</ExplorerHeader>
    </Grid>
    <Grid>{children}</Grid>
  </Grid.Container>
);
