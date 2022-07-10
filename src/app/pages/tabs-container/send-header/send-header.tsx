import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Spacer } from '@nextui-org/react';
import React from 'react';
import { MultiValue, SingleValue } from 'react-select';

import { ColoredSelect } from '../../../components';
import {
  CollectionType,
  Environment,
  Tab,
  useEnvironmentsStore,
  useTabsStore,
} from '../../../storage';
import { CreateEnvironmentModal } from '../../environments';
import { SendButton } from './send-button.styled';

export interface SendHeaderProps {
  tab: Tab<CollectionType>;
}

export const SendHeader: React.FC<SendHeaderProps> = ({ tab }) => {
  const { updateTab, updateTabs } = useTabsStore((store) => store);
  const { removeEnvironment, environments } = useEnvironmentsStore((store) => store);

  const selectedEnvironment = environments.find((item) => item.id === tab.environmentId) || null;

  const [createEnvironmentModalVisible, setCreateEnvironmentModalVisible] = React.useState(false);

  const handleEnvironmentChange = (value: MultiValue<Environment> | SingleValue<Environment>) => {
    const environment = value as Environment;

    updateTab({
      ...tab,
      environmentId: environment?.id,
      url: environment?.url,
    });
  };

  const handleRemoveEnvironment = (environment: Environment) => {
    removeEnvironment(environment.id);
    updateTabs({ environmentId: undefined }, { environmentId: environment.id });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateTab({
      ...tab,
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

  const handleSendButtonClick = async () => {
    const result = await window.electron.grpcClient.sendUnaryRequest(
      {
        path: '/Users/notmedia/work/protogun/protogun/src/core/__tests__/fixtures/proto/basic.proto',
      },
      'BasicService',
      tab.title,
      tab.url || '',
      JSON.parse(tab.requestContainer.request.value || '{}'),
      JSON.parse(tab.requestContainer.metadata.value || '{}')
    );
    console.log('result: ', result);
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
          value={tab.url || ''}
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
          url: tab.url || '',
        }}
        onCreate={handleCreateEnvironmentModalSubmit}
        onClose={handleCreateEnvironmentModalClose}
      />
    </>
  );
};
