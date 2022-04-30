import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from '@nextui-org/react';
import React from 'react';

import { Explorer } from '../../components';

export const Main = (): JSX.Element => (
  <Explorer
    header={
      <Button auto light size="sm" color="warning" icon={<FontAwesomeIcon icon={faSquarePlus} />}>
        Import proto
      </Button>
    }
  >
    <Container gap={1} css={{ display: 'flex', background: '$backgroundContrast' }}>
      test
    </Container>
  </Explorer>
);
