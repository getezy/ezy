import { Container, CSS, Spacer } from '@nextui-org/react';
import React from 'react';

const ExporerHeaderContainerStyles: CSS = {
  background: '$backgroundContrast',
  borderBottom: 'solid $border 1px',
};

export interface ExplorerHeaderProps {
  children: React.ReactNode;
}

export const ExplorerHeader: React.FC<ExplorerHeaderProps> = ({ children }) => (
  <Container gap={0} css={ExporerHeaderContainerStyles}>
    <Spacer y={0.5} />
    {children}
    <Spacer y={0.5} />
  </Container>
);
