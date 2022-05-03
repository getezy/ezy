import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { styled } from '@nextui-org/react';
import ReactTabs, { TabPane as ReactTabPane } from 'rc-tabs';
import React from 'react';

import { DraggableTab } from './DraggableTab';

// @ts-ignore
const StyledTabs = styled(ReactTabs, {
  '.rc-tabs-nav-operations': {
    display: 'none',
  },

  '.rc-tabs-nav-list': {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    paddingTop: 17,
    paddingLeft: 5,
    overflow: 'auto',
    borderBottom: 'solid $accents2 1px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  '.rc-tabs-tab': {
    display: 'flex',
    alignItems: 'center',
    height: 35,
    paddingLeft: 10,
    paddingRight: 10,
    minWidth: 'max-content',
    font: 'inherit',
    userSelect: 'none',
    background: '$accents1',
    borderLeft: 'solid $accents2 1px',
    borderRight: 'solid $accents2 1px',
    '&:focus': {
      outline: 'none',
    },
  },

  '.rc-tabs-tab-active': {
    background: '$accents2',
    borderBottom: 'solid $primary 2px',
  },

  '.rc-tabs-content': {
    paddingTop: 10,
  },
});

const StyledTabPane = styled(ReactTabPane);

export interface TabProps {
  id: string;

  title: string;

  content: React.ReactNode;
}

export interface DraggableTabsProps {
  tabs: TabProps[];

  activeKey?: string;

  onChange?: (activeKey: string) => void;

  onDragEnd?: (event: DragEndEvent) => void;
}

export const DraggableTabs: React.FC<DraggableTabsProps> = ({
  tabs,
  activeKey,
  onChange,
  onDragEnd,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 30,
      },
    })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={tabs}>
        <StyledTabs
          animated={{ inkBar: false, tabPane: false }}
          activeKey={activeKey}
          onChange={onChange}
          renderTabBar={(props, DefaultTabBar) => (
            <DefaultTabBar {...props}>
              {(node) => <DraggableTab id={node.key as string}>{node}</DraggableTab>}
            </DefaultTabBar>
          )}
        >
          {tabs.map((tab) => (
            <StyledTabPane key={tab.id} tab={tab.title}>
              {tab.content}
            </StyledTabPane>
          ))}
        </StyledTabs>
      </SortableContext>
    </DndContext>
  );
};
