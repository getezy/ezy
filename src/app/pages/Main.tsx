import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Text } from '@nextui-org/react';
import React from 'react';

import { Circle, Explorer, SideBar } from '../components';
import { useWorkspacesStore } from '../storage';
import { Header } from './header';
import { Requests } from './requests';

export const Main = (): JSX.Element => {
  const { workspaces } = useWorkspacesStore((store) => store);

  const sideBar = (
    <SideBar
      css={{ height: 'calc(100vh - 50px)' }}
      items={workspaces.map((workspace) => ({
        label: (
          <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
            <Text>{workspace.name}</Text>
            <Button
              auto
              size="xs"
              light
              onClick={(e) => e.stopPropagation()}
              icon={<FontAwesomeIcon icon={faEllipsis} />}
            />
          </div>
        ),
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
