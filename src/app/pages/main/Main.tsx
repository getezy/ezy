import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container } from '@nextui-org/react';
import React from 'react';

import { Explorer, List } from '../../components';

export const Main = (): JSX.Element => {
  const header = (
    <Button auto light size="sm" color="warning" icon={<FontAwesomeIcon icon={faSquarePlus} />}>
      Create service
    </Button>
  );

  const menu = <List items={[{ label: 'test' }, { label: 'test2' }]} />;

  return (
    <Explorer header={header} menu={menu}>
      <Container fluid gap={0}>
        Test Container
      </Container>
    </Explorer>
  );
};
