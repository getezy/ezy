import { Container } from '@nextui-org/react';
import React from 'react';

import { DraggableTabs, ResizablePanel } from '../../components';
import { useTabsStore } from '../../storage';
import { SendHeader } from './send-header';

export const TabsContainer = (): JSX.Element => {
  const {
    activate: activateTab,
    getActiveTabId,
    move: moveTab,
    remove: closeTab,
    create,
  } = useTabsStore((store) => store);

  const tabs = useTabsStore((store) => store.tabs).map((item) => ({
    ...item,
    content: (
      <Container gap={0} fluid css={{ height: '100%', paddingTop: 20 }}>
        <SendHeader />
        <Container
          fluid
          gap={0}
          css={{ display: 'flex', height: 'calc(100% - 32px)', paddingTop: 20 }}
        >
          <ResizablePanel firstNode={<div>first</div>} secondNode={<div>second</div>} />
        </Container>
      </Container>
    ),
  }));

  return (
    <DraggableTabs
      tabs={tabs}
      activeKey={getActiveTabId()}
      showAddButton
      onActivate={activateTab}
      onAdd={() => create({ title: 'New Tab' })}
      onClose={closeTab}
      onDragEnd={({ active, over }) => moveTab(active.id, over?.id)}
    />
  );
};
