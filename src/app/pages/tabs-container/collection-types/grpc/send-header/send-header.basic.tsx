import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Spacer } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';
import { MultiValue, SingleValue } from 'react-select';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { ColoredSelect } from '../../../../../components';
import { Environment, GrpcTab, useEnvironmentsStore, useTabsStore } from '../../../../../storage';
import { CreateEnvironmentModal } from '../../../../environments';

export interface SendHeaderProps<T extends GrpcMethodType> {
  tab: GrpcTab<T>;
}

export const SendHeader: React.FC<PropsWithChildren<SendHeaderProps<GrpcMethodType>>> = ({
  tab,
  children,
}) => {
  const { updateGrpcTabData, updateGrpcTabsEnvironment } = useTabsStore((store) => store);
  const { removeEnvironment, environments } = useEnvironmentsStore((store) => store);

  const selectedEnvironment =
    environments.find((item) => item.id === tab.data.environmentId) || null;

  const [createEnvironmentModalVisible, setCreateEnvironmentModalVisible] = React.useState(false);

  const handleEnvironmentChange = (value: MultiValue<Environment> | SingleValue<Environment>) => {
    const environment = value as Environment;

    updateGrpcTabData(tab.id, {
      environmentId: environment?.id,
      url: environment?.url,
    });
  };

  const handleRemoveEnvironment = (environment: Environment) => {
    removeEnvironment(environment.id);
    updateGrpcTabsEnvironment(environment.id, undefined);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateGrpcTabData(tab.id, {
      environmentId: undefined,
      url: e.target.value,
    });
  };

  const handleCreateEnvironmentModalSubmit = (environment: Environment) => {
    handleEnvironmentChange(environment);
    setCreateEnvironmentModalVisible(false);
  };

  const handleCreateEnvironmentModalClose = () => {
    setCreateEnvironmentModalVisible(false);
  };

  return (
    <>
      <Container
        gap={0.5}
        fluid
        css={{
          display: 'flex',
          flexWrap: 'nowrap',
          height: 30,
        }}
      >
        <ColoredSelect
          bordered
          borderWeight="light"
          size="sm"
          placeholder="Environment"
          options={environments}
          css={{ flex: 2 }}
          value={selectedEnvironment}
          onChange={handleEnvironmentChange}
          onRemove={handleRemoveEnvironment}
        />
        <Spacer x={0.2} />
        <Input
          size="sm"
          bordered
          borderWeight="light"
          animated={false}
          clearable
          placeholder="0.0.0.0:3000"
          css={{ flex: 5 }}
          value={tab.data.url || ''}
          onChange={handleUrlChange}
          contentRight={
            <Button
              auto
              light
              icon={<FontAwesomeIcon icon={faFloppyDisk} />}
              css={{
                background: 'transparent',
                padding: 0,
                margin: 0,
                minWidth: 10,
                color: '$accents6',
                '&:hover': {
                  color: '$accents5',
                },
              }}
              onClick={() => setCreateEnvironmentModalVisible(true)}
            />
          }
        />
        {/* <Spacer x={0.2} />
        <Button
          size="sm"
          light
          color="success"
          css={{ minWidth: 10 }}
          icon={<FontAwesomeIcon icon={faLock} />}
        />
        <Button
          size="sm"
          light
          color="default"
          css={{ minWidth: 10 }}
          icon={<FontAwesomeIcon icon={faLockOpen} />}
        /> */}
        {children}
      </Container>
      <CreateEnvironmentModal
        closeButton
        blur
        open={createEnvironmentModalVisible}
        defaultValues={{
          url: tab.data.url || '',
        }}
        onCreate={handleCreateEnvironmentModalSubmit}
        onClose={handleCreateEnvironmentModalClose}
      />
    </>
  );
};
