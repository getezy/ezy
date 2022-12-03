import { faPaperPlane, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Action, Priority, useRegisterActions } from '@getezy/kbar';
import { Container } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '@core/types';
import {
  CollectionType,
  isGrpcTab,
  isGrpcTabBidirectionalStreaming,
  isGrpcTabClientStreaming,
  isGrpcTabServerStreaming,
  isGrpcTabUnaryCall,
  useCollectionsStore,
  useTabsStore,
} from '@storage';

import { StreamBadge, UnaryBadge } from '../../collections/badge-types';
import {
  useBidirectionalStreaming,
  useClientStreaming,
  useServerStreaming,
  useUnaryCall,
} from '../../tabs-container/collection-types/grpc/hooks';

function useGrpcInvokeAction(): Action {
  const { tabs, activeTabId } = useTabsStore((store) => store);
  const { invoke: invokeUnaryCall } = useUnaryCall();
  const { invoke: invokeServerStreaming } = useServerStreaming();
  const { invoke: invokeClientStreaming } = useClientStreaming();
  const { invoke: invokeBidirectionalStreaming } = useBidirectionalStreaming();

  return {
    id: 'grpc:invoke',
    section: 'grpc',
    name: 'Invoke',
    icon: <FontAwesomeIcon icon={faPaperPlane} />,
    shortcut: ['$mod+Enter'],
    perform: () => {
      const tab = tabs.find((item) => item.id === activeTabId);
      if (tab && isGrpcTab(tab)) {
        if (isGrpcTabUnaryCall(tab)) {
          invokeUnaryCall(tab);
        } else if (isGrpcTabServerStreaming(tab)) {
          invokeServerStreaming(tab);
        } else if (isGrpcTabClientStreaming(tab)) {
          invokeClientStreaming(tab);
        } else if (isGrpcTabBidirectionalStreaming(tab)) {
          invokeBidirectionalStreaming(tab);
        }
      }
    },
  };
}

export function useGrpcMethodActions() {
  const { collections } = useCollectionsStore((store) => store);
  const { createGrpcTab } = useTabsStore((store) => store);
  const invokeAction = useGrpcInvokeAction();

  const methods = collections.reduce((acc, collection) => {
    collection.children?.forEach((service) => {
      service.methods?.forEach((method) => {
        acc.push({
          id: method.name,
          name: method.name,
          keywords: `${collection.name} ${service.name} ${method.name}`,
          subtitle: `${collection.name} → ${service.name}`,
          parent: 'grpc:new-tab',
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
        id: 'grpc:new-tab',
        section: 'grpc',
        name: 'New gRPC Tab',
        priority: Priority.HIGH,
        icon: <FontAwesomeIcon icon={faSquarePlus} />,
        shortcut: ['$mod+T'],
      },
      invokeAction,
      ...methods,
    ],
    [methods]
  );
}
