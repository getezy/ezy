import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Spacer, styled } from '@nextui-org/react';
import React from 'react';

import { DraggableTabs, Select } from '../components';
import { useEnvironmentsStore, useTabsStore } from '../storage';
import { SaveEnvironmentModal } from './environments';

// @ts-ignore
const SendButton = styled(Button, {
  transition: 'opacity 0.25s ease 0s, transform 0.25s ease 0s',
  svg: {
    size: '10%',
    marginLeft: '100px',
    transition: 'transform 0.25s ease 0s, opacity 200ms ease-in-out 50ms',
    boxShadow: '0 5px 20px -5px rgba(0, 0, 0, 0.1)',
  },
  '&:hover': {
    opacity: 0.8,
  },
  '&:active': {
    transform: 'scale(0.9)',
    svg: {
      transform: 'translate(24px, -24px)',
      opacity: 0,
    },
  },
});

export const Requests = (): JSX.Element => {
  const [saveEnvironmentModalVisible, setSaveEnvironmentModalVisible] = React.useState(false);
  const environments = useEnvironmentsStore((store) => store.environments).map((env) => ({
    value: env.id,
    label: env.name,
  }));

  const tabs = useTabsStore((store) => store.tabs).map((item) => ({
    ...item,
    content: (
      <Container gap={0} fluid>
        <Container gap={1} fluid css={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Select size="sm" css={{ flex: 1 }} placeholder="Environment" options={environments} />
          <Spacer x={0.2} />
          <Input
            size="sm"
            labelLeft="URL"
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
                  color: '$accents4',
                  '&:hover': {
                    color: '$accents2',
                  },
                }}
                onClick={() => setSaveEnvironmentModalVisible(true)}
              />
            }
          />
          <Spacer />
          <SendButton
            size="sm"
            bordered
            color="gradient"
            iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
          >
            Send
          </SendButton>
        </Container>
      </Container>
    ),
  }));

  const {
    activate: activateTab,
    getActiveTabId,
    move: moveTab,
    remove: closeTab,
    create,
  } = useTabsStore((store) => store);

  return (
    <div>
      <DraggableTabs
        tabs={tabs}
        activeKey={getActiveTabId()}
        showAddButton
        onActivate={activateTab}
        onAdd={() => {
          create({ title: 'New Tab' });
        }}
        onClose={closeTab}
        onDragEnd={(event) => {
          const { active, over } = event;
          moveTab(active.id, over?.id);
        }}
      />
      <SaveEnvironmentModal
        closeButton
        preventClose
        blur
        open={saveEnvironmentModalVisible}
        onClose={() => setSaveEnvironmentModalVisible(false)}
      />
    </div>
  );
};
