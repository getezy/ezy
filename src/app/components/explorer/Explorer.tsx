import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, CSS } from '@nextui-org/react';
import React from 'react';

const ExporerHeaderContainerStyles: CSS = {
  display: 'flex',
  paddingTop: '10px',
  height: '50px',
  background: '$backgroundContrast',
  borderBottom: 'solid $accents2 1px',
};

const ExplorerHeader: React.FC = () => (
  <Container css={ExporerHeaderContainerStyles}>
    <Button auto flat size="sm" color="warning" icon={<FontAwesomeIcon icon={faSquarePlus} />}>
      Import proto
    </Button>
  </Container>
);

const ExporerContainerStyles: CSS = {
  display: 'flex',
  flexWrap: 'nowrap',
  height: '100vh',
  margin: 0,
  width: '250px',
  background: '$backgroundContrast',
  borderRight: 'solid $accents2 1px',
};

export interface ExplorerProps {
  // children: React.ReactNode;
}

export const Explorer: React.FC<ExplorerProps> = () => (
  <Container gap={0} css={ExporerContainerStyles}>
    <ExplorerHeader />
  </Container>
);
