import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import React from 'react';

import { Explorer, List } from '../../components';
import { Requests } from './Reqeusts';
// import { Requests } from './OldRequests';

export const Main = (): JSX.Element => {
  const header = (
    <Button auto bordered color="gradient" size="sm" icon={<FontAwesomeIcon icon={faSquarePlus} />}>
      Create project
    </Button>
  );

  const menu = <List items={[{ label: 'test' }, { label: 'test2' }]} />;

  return (
    <Explorer header={header} menu={menu}>
      <Requests />
    </Explorer>
  );
};
