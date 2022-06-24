import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Text } from '@nextui-org/react';
import React from 'react';

import { SideBar } from '../components';
import { useServicesStore } from '../storage';
import { MethodBadge, ServiceBadge, StreamBadge } from './services/badge-types';

export const ExplorerSideBar = (): JSX.Element => {
  const { services } = useServicesStore((store) => store);

  return (
    <>
      {/* <Input
        bordered
        borderWeight="light"
        fullWidth
        animated={false}
        placeholder="Search"
        clearable
        size="sm"
        css={{
          padding: 10,
        }}
      /> */}
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
          content: (
            <>
              <ServiceBadge />
              <MethodBadge />
              <StreamBadge />
              <Text>sub item</Text>
            </>
          ),
        }))}
      />
    </>
  );
};
