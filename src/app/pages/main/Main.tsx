import { Text } from '@nextui-org/react';
import React from 'react';

import { Circle, Explorer, SideBar } from '../../components';
import { Header } from './Header';
import { Requests } from './Requests';

export const Main = (): JSX.Element => {
  const sideBar = (
    <SideBar
      css={{ height: 'calc(100vh - 50px)' }}
      items={[
        {
          label: <Text>test</Text>,
          content: <Text>sub item</Text>,
          contentLeft: <Circle color="$primary" />,
        },
        {
          label: <Text>test2</Text>,
          content: <Text>sub item</Text>,
          contentLeft: <Circle color="$warning" />,
        },
      ]}
    />
  );

  return (
    <Explorer header={<Header />} sideBar={sideBar}>
      <Requests />
    </Explorer>
  );
};
