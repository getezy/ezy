import { faFloppyDisk, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Spacer } from '@nextui-org/react';
import React from 'react';

import { DraggableTabs, ResizablePanel, Select } from '../../components';
import { useEnvironmentsStore, useTabsStore } from '../../storage';
import { CreateEnvironmentModal } from '../environments';
import { SendButton } from './send-button.styled';

export const Requests = (): JSX.Element => {
  const [createEnvironmentModalVisible, setCreateEnvironmentModalVisible] = React.useState(false);
  const environments = useEnvironmentsStore((store) => store.environments).map((env) => ({
    value: env.id,
    label: env.name,
  }));

  const tabs = useTabsStore((store) => store.tabs).map((item) => ({
    ...item,
    content: (
      <Container gap={0} fluid css={{ height: '100%', paddingTop: 20 }}>
        <Container gap={0.5} fluid css={{ display: 'flex', flexWrap: 'nowrap', height: 32 }}>
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
                  color: '$accents5',
                  '&:hover': {
                    color: '$accents3',
                  },
                }}
                onClick={() => setCreateEnvironmentModalVisible(true)}
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
        <Container
          fluid
          gap={0}
          style={{ display: 'flex', height: 'calc(100% - 32px)', paddingTop: 20 }}
        >
          <ResizablePanel firstNode={<div>first</div>} secondNode={<div>second</div>} />
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
      <CreateEnvironmentModal
        closeButton
        preventClose
        blur
        open={createEnvironmentModalVisible}
        onClose={() => setCreateEnvironmentModalVisible(false)}
      />
    </div>
  );
};
