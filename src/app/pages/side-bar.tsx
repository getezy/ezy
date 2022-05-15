import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Text } from '@nextui-org/react';
import React from 'react';

import { SideBar } from '../components';
import { useServicesStore } from '../storage';

export const ExplorerSideBar = (): JSX.Element => {
  const { services } = useServicesStore((store) => store);

  return (
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
};
