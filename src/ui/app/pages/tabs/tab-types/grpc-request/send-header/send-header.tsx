import { Container, Input, Spacer } from '@nextui-org/react';
import React from 'react';
import { MultiValue, SingleValue } from 'react-select';

import { ColoredSelect } from '@components';
import { Environment, GrpcRequestTab } from '@core';
import { useEnvironmentsStore, useTabsStore } from '@new-storage';

export type SendHeaderProps = {
  tab: GrpcRequestTab;
};

export const SendHeader: React.FC<SendHeaderProps> = ({ tab }) => {
  const { environments, remove: removeEnvironment } = useEnvironmentsStore((store) => store);
  const { update: updateTab } = useTabsStore();

  const selectedEnvironment = environments.find((item) => item.id === tab?.environmentId) || null;

  const handleEnvironmentChange = (value: MultiValue<Environment> | SingleValue<Environment>) => {
    const environment = value as Environment;

    updateTab(tab.id, {
      environmentId: environment?.id,
      url: environment?.url,
    });
  };

  const handleRemoveEnvironment = (environment: Environment) => {
    removeEnvironment(environment.id);
    // updateGrpcTabsEnvironment(environment.id, undefined);
  };

  return (
    <Container gap={0.5} fluid display="flex" wrap="nowrap">
      <ColoredSelect
        aria-label="tab-environment-select"
        bordered
        borderWeight="light"
        size="sm"
        placeholder="Environment"
        options={environments}
        css={{ flex: 2, maxWidth: 200 }}
        value={selectedEnvironment}
        onChange={handleEnvironmentChange}
        onRemove={handleRemoveEnvironment}
      />
      <Spacer x={0.2} />
      <Input
        aria-label="tab-url-input"
        size="sm"
        animated={false}
        clearable
        placeholder="0.0.0.0:3000"
        css={{ flex: 6 }}
      />
    </Container>
  );
};
