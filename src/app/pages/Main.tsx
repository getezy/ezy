import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Text } from '@nextui-org/react';
import React from 'react';

import { Explorer, SideBar } from '../components';
import { useServicesStore } from '../storage';
import { Header } from './header';
import { Requests } from './requests';

export const Main = (): JSX.Element => {
  const { services } = useServicesStore((store) => store);

  const sideBar = (
    <SideBar
      css={{ height: 'calc(100vh - 50px)' }}
      items={services.map((service) => ({
        label: (
          <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between' }}>
            <Text>{service.name}</Text>
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
      }))}
    />
  );

  return (
    <Explorer header={<Header />} sideBar={sideBar}>
      <Requests />
    </Explorer>
  );
};
