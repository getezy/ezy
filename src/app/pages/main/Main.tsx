import { Text } from '@nextui-org/react';
import React from 'react';

import { Circle, Explorer, SideBar } from '../../components';
import { useWorkspacesStore } from '../../storage';
import { Header } from './Header';
import { Requests } from './Requests';

export const Main = (): JSX.Element => {
  const workspaces = useWorkspacesStore((store) => store.workspaces);

  const sideBar = (
    <SideBar
      css={{ height: 'calc(100vh - 50px)' }}
      items={workspaces.map((workspace) => ({
        label: <Text>{workspace.name}</Text>,
        content: <Text>sub item</Text>,
        contentLeft: <Circle color={workspace.color} />,
      }))}
    />
  );

  return (
    <Explorer header={<Header />} sideBar={sideBar}>
      <Requests />
    </Explorer>
  );
};
