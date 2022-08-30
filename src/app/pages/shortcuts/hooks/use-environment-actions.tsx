import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from '@nextui-org/react';
import { Action, Priority, useRegisterActions } from 'kbar';
import React from 'react';

import { ColorCircle } from '../../../components';
import { useEnvironmentsStore, useTabsStore } from '../../../storage';

export function useEnvironmentActions() {
  const { environments } = useEnvironmentsStore((store) => store);
  const { activeTabId, updateGrpcTabData } = useTabsStore((store) => store);

  const actions: Action[] = environments.map((environment) => ({
    id: environment.id,
    name: environment.label,
    keywords: environment.label,
    subtitle: environment.url,
    parent: 'environment',
    icon: (
      <Container
        gap={0}
        display="flex"
        justify="center"
        alignItems="center"
        wrap="nowrap"
        css={{ width: 40 }}
      >
        <ColorCircle color={environment.color} size="sm" shadow />
      </Container>
    ),
    perform: () => {
      if (activeTabId) {
        updateGrpcTabData(activeTabId, {
          environmentId: environment.id,
          url: environment.url,
        });
      }
    },
  }));

  useRegisterActions(
    [
      {
        id: 'environment',
        section: 'Environment',
        name: 'Select environment',
        priority: Priority.HIGH,
        icon: <FontAwesomeIcon icon={faBolt} />,
        shortcut: ['$mod+E'],
      },
      ...actions,
    ],
    [actions]
  );
}
