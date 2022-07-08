import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Spacer } from '@nextui-org/react';
import React from 'react';
import { MultiValue, SingleValue } from 'react-select';

import { ColoredSelect } from '../../../components';
import { Environment, Tab, useEnvironmentsStore, useTabsStore } from '../../../storage';
import { CreateEnvironmentModal } from '../../environments';
import { SendButton } from './send-button.styled';

export interface SendHeaderProps {
  tab: Tab;
}

export const SendHeader: React.FC<SendHeaderProps> = ({ tab }) => {
  const { updateTab } = useTabsStore((store) => store);
  const { removeEnvironment } = useEnvironmentsStore((store) => store);
  const environments = useEnvironmentsStore((store) => store.environments);

  const [createEnvironmentModalVisible, setCreateEnvironmentModalVisible] = React.useState(false);

  const [selectedEnvironment, setSelectedEnvironment] = React.useState<Environment | null>(
    environments.find((item) => item.id === tab.environmentId) || null
  );

  const [url, setUrl] = React.useState(selectedEnvironment?.url || tab.url || '');

  const handleEnvironmentChange = (value: MultiValue<Environment> | SingleValue<Environment>) => {
    const environment = value as Environment;

    const updatedTab: Tab = {
      ...tab,
      environmentId: environment?.id,
      url: environment?.url,
    };

    setSelectedEnvironment(environment);
    setUrl(environment?.url);
    updateTab(updatedTab);
  };

  const handleRemoveEnvironment = (environment: Environment) => {
    removeEnvironment(environment.id);

    if (selectedEnvironment?.id === environment.id) {
      const updatedTab: Tab = {
        ...tab,
        environmentId: undefined,
      };

      setSelectedEnvironment(null);
      updateTab(updatedTab);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedTab: Tab = {
      ...tab,
      environmentId: undefined,
      url: e.target.value,
    };

    setUrl(e.target.value);
    setSelectedEnvironment(null);
    updateTab(updatedTab);
  };

  const handleCreateEnvironmentModalSubmit = (environment: Environment) => {
    handleEnvironmentChange(environment);
    setCreateEnvironmentModalVisible(false);
  };

  const handleCreateEnvironmentModalClose = () => {
    setCreateEnvironmentModalVisible(false);
  };

  const handleSendButtonClick = async () => {
    await window.electron.grpcClient.sendUnaryRequest(
      { path: 'path' },
      'BasicService',
      tab.title,
      tab.url || '',
      { id: '123' }
    );
  };

  return (
    <>
      <Container gap={0.5} fluid css={{ display: 'flex', flexWrap: 'nowrap' }}>
        <ColoredSelect
          bordered
          borderWeight="light"
          size="sm"
          placeholder="Environment"
          options={environments}
          css={{ width: 150 }}
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
          value={url}
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
        <Spacer x={0.5} />
        <SendButton
          size="sm"
          bordered
          borderWeight="light"
          color="gradient"
          iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
          onClick={handleSendButtonClick}
        >
          Send
        </SendButton>
      </Container>
      <CreateEnvironmentModal
        closeButton
        blur
        open={createEnvironmentModalVisible}
        defaultValues={{
          url,
        }}
        onCreate={handleCreateEnvironmentModalSubmit}
        onClose={handleCreateEnvironmentModalClose}
      />
    </>
  );
};
