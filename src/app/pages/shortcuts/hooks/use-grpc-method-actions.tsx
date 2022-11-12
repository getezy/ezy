import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Action, Priority, useRegisterActions } from '@getezy/kbar';
import { Container } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '@core/types';
import { CollectionType, useCollectionsStore, useTabsStore } from '@storage';

import { StreamBadge, UnaryBadge } from '../../collections/badge-types';

export function useGrpcMethodActions() {
  const { collections } = useCollectionsStore((store) => store);
  const { createGrpcTab } = useTabsStore((store) => store);

  const methods = collections.reduce((acc, collection) => {
    collection.children?.forEach((service) => {
      service.methods?.forEach((method) => {
        acc.push({
          id: method.name,
          name: method.name,
          keywords: `${collection.name} ${service.name} ${method.name}`,
          subtitle: `${collection.name} → ${service.name}`,
          parent: 'grpc',
          icon: (
            <Container
              gap={0}
              display="flex"
              justify="center"
              alignItems="center"
              wrap="nowrap"
              css={{ width: 40 }}
            >
              {method.type === GrpcMethodType.UNARY ? (
                <UnaryBadge />
              ) : (
                <StreamBadge type={method.type} />
              )}
            </Container>
          ),
          perform: () => {
            createGrpcTab({
              type: CollectionType.GRPC,
              title: method.name,
              info: {
                collectionId: collection.id,
                serviceId: service.id,
                methodId: method.id,
                methodType: method.type,
              },
            });
          },
        });
      });
    });
    return acc;
  }, [] as Action[]);

  useRegisterActions(
    [
      {
        id: 'grpc',
        section: 'Grpc',
        name: 'New gRPC Tab',
        priority: Priority.HIGH,
        icon: <FontAwesomeIcon icon={faSquarePlus} />,
        shortcut: ['$mod+T'],
      },
      ...methods,
    ],
    [methods]
  );
}
