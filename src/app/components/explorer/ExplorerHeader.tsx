import { Container, CSS } from '@nextui-org/react';
import React from 'react';

const ExporerHeaderContainerStyles: CSS = {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '10px',
  paddingBottom: '10px',
  background: '$backgroundContrast',
  borderBottom: 'solid $accents2 1px',
};

export interface ExplorerHeaderProps {
  children: React.ReactNode;
}

export const ExplorerHeader: React.FC<ExplorerHeaderProps> = ({ children }) => (
  <Container gap={1} css={ExporerHeaderContainerStyles}>
    {children}
  </Container>
);
