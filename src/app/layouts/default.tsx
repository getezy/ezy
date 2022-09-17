import { Container } from '@nextui-org/react';
import React from 'react';

export interface DefaultLayoutProps {
  left?: React.ReactNode;
  bottom?: React.ReactNode;
}

export const DefaultLayout: React.FC<React.PropsWithChildren<DefaultLayoutProps>> = ({
  children,
  left,
  bottom,
}) => (
  <Container
    gap={0}
    responsive={false}
    display="flex"
    direction="column"
    css={{ height: '100%', overflow: 'hidden' }}
  >
    <Container
      gap={0}
      responsive={false}
      display="flex"
      wrap="nowrap"
      css={{ flex: 1, overflow: 'hidden' }}
    >
      {left}
      {children}
    </Container>
    {bottom}
  </Container>
);
