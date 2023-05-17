import { faFloppyDisk, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GrpcTlsType } from '@getezy/grpc-client';
import { Button, Container, Input, Spacer, Tooltip } from '@nextui-org/react';
import React from 'react';
import { MultiValue, SingleValue } from 'react-select';

import { ColoredSelect } from '@components';
import { Environment, IGrpcRequestTab } from '@core';
import { useAppStorage } from '@new-storage';

import { ProtocolSwitch } from './protocol-switch';

export type SendHeaderProps = {
  tab: IGrpcRequestTab;
};

export const SendHeader: React.FC<SendHeaderProps> = ({ tab }) => {
  const { environments, tlsPresets, updateTab, removeEnvironmentAndResetTabs } = useAppStorage(
    (store) => store
  );

  const selectedEnvironment = environments.find((item) => item.id === tab?.environmentId) || null;

  const selectedTlsPreset = tlsPresets.find((item) => item.id === tab.tlsId);

  const handleEnvironmentChange = (value: MultiValue<Environment> | SingleValue<Environment>) => {
    const environment = value as Environment;

    updateTab(tab.id, {
      environmentId: environment?.id,
      url: environment?.url,
    });
  };

  const handleRemoveEnvironment = (environment: Environment) => {
    removeEnvironmentAndResetTabs(environment.id);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateTab(tab.id, {
      environmentId: undefined,
      url: e.target.value,
    });
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
        value={tab.url || ''}
        onChange={handleUrlChange}
        contentLeftStyling={false}
        contentLeft={
          selectedTlsPreset && selectedTlsPreset.tls.type !== GrpcTlsType.INSECURE ? (
            <Tooltip content="Connection is secure" placement="bottom" enterDelay={500}>
              <Button
                size="sm"
                light
                animated={false}
                css={{
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  minWidth: 30,
                  color: '$success',
                  '&:hover': {
                    color: '$successBorder',
                  },
                }}
                icon={<FontAwesomeIcon icon={faLock} />}
                // onClick={handleTlsSettingsModalVisible}
              />
            </Tooltip>
          ) : (
            <Tooltip content="Connection is not secure" enterDelay={500}>
              <Button
                size="sm"
                light
                animated={false}
                css={{
                  background: 'transparent',
                  padding: 0,
                  margin: 0,
                  minWidth: 30,
                  color: '$accents6',
                  '&:hover': {
                    color: '$accents5',
                  },
                }}
                icon={<FontAwesomeIcon icon={faUnlock} />}
                // onClick={handleTlsSettingsModalVisible}
              />
            </Tooltip>
          )
        }
        contentRight={
          <Tooltip content="Save environment" enterDelay={500}>
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
              // onClick={handleCreateEnvironmentModalVisible}
            />
          </Tooltip>
        }
      />
      <Spacer x={0.5} />
      <ProtocolSwitch
        tab={tab}
        // onChange={handleGrpcProtocolChange}
      />
    </Container>
  );
};
