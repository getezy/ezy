import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Spacer } from '@nextui-org/react';
import React from 'react';

import { ColoredSelect } from '../../../components';
import { useEnvironmentsStore } from '../../../storage';
import { CreateEnvironmentModal } from '../../environments';
import { SendButton } from './send-button.styled';

export const SendHeader = (): JSX.Element => {
  const [createEnvironmentModalVisible, setCreateEnvironmentModalVisible] = React.useState(false);
  const environments = useEnvironmentsStore((store) => store.environments).map((env) => ({
    value: env.id,
    label: env.name,
    color: env.color,
  }));

  return (
    <>
      <Container gap={0.5} fluid css={{ display: 'flex', flexWrap: 'nowrap' }}>
        <ColoredSelect
          size="sm"
          placeholder="Environment"
          options={environments}
          css={{ width: 150 }}
        />
        <Spacer x={0.2} />
        <Input
          size="sm"
          animated={false}
          clearable
          placeholder="127.0.0.1:3000"
          css={{ flex: 5 }}
          contentRight={
            <Button
              auto
              size="xs"
              light
              icon={<FontAwesomeIcon icon={faFloppyDisk} />}
              css={{
                background: 'transparent',
                padding: 0,
                margin: 0,
                color: '$accents6',
                '&:hover': {
                  color: '$accents5',
                },
              }}
              onClick={() => setCreateEnvironmentModalVisible(true)}
            />
          }
        />
        <Spacer x={0.5} />
        <SendButton
          size="sm"
          bordered
          color="gradient"
          iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
        >
          Send
        </SendButton>
      </Container>
      <CreateEnvironmentModal
        closeButton
        preventClose
        blur
        open={createEnvironmentModalVisible}
        onClose={() => setCreateEnvironmentModalVisible(false)}
      />
    </>
  );
};
