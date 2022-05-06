import { faFolder, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Text } from '@nextui-org/react';
import React from 'react';

import { Explorer, Menu } from '../../components';
import { Requests } from './Requests';

export const Main = (): JSX.Element => {
  const header = (
    <Button auto bordered color="gradient" size="sm" icon={<FontAwesomeIcon icon={faSquarePlus} />}>
      Create workspace
    </Button>
  );

  const menu = (
    <Menu
      css={{ height: 'calc(100vh - 50px)' }}
      items={[
        {
          label: <Text>test</Text>,
          content: <Text>sub item</Text>,
          contentLeft: <FontAwesomeIcon size="sm" icon={faFolder} />,
        },
        {
          label: <Text>test2</Text>,
          content: <Text>sub item</Text>,
          contentLeft: <FontAwesomeIcon size="sm" icon={faFolder} />,
        },
      ]}
    />
  );

  return (
    <Explorer header={header} menu={menu}>
      <Requests />
    </Explorer>
  );
};
