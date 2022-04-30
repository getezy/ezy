import { faArrowsRotate, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from '@nextui-org/react';
import * as React from 'react';

function ExplorerHeader() {
  return (
    <Container
      gap={0}
      css={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        borderBottom: 'solid 2px $border',
      }}
    >
      <Button auto light icon={<FontAwesomeIcon icon={faFileArrowUp} />}>
        Import proto
      </Button>
      <Button auto light icon={<FontAwesomeIcon icon={faArrowsRotate} />}>
        Reload
      </Button>
    </Container>
  );
}

export function Explorer() {
  return (
    <Container
      gap={0}
      css={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 0,
        height: '100vh',
        backgroundColor: '$accents1',
      }}
    >
      <ExplorerHeader />
      <ul>
        <li>Service A</li>
        <li>Service B</li>
        <li>Service C</li>
      </ul>
    </Container>
  );
}
