import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { styled, Text } from '@nextui-org/react';
import ReactTabs, { TabPane as ReactTabPane } from 'rc-tabs';
import React from 'react';

import { DraggableTab } from './DraggableTab';

// @ts-ignore
const StyledTabs = styled(ReactTabs, {
  '.rc-tabs': {
    bottom: 0,
  },
  '.rc-tabs-nav': {},
  '.rc-tabs-nav-wrap': {},
  '.rc-tabs-nav-operations': {
    display: 'none',
  },
  '.rc-tabs-nav-list': {
    display: 'flex',
    overflow: 'auto',
    transition: 'transform 0.3s',
    borderBottom: 'solid $accents2 1px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  '.rc-tabs-content': {
    paddingTop: 20,
  },
  '.rc-tabs-tab': {
    display: 'flex',
    alignItems: 'center',
    height: 40,
    minWidth: 'max-content',
    cursor: 'pointer',
    userSelect: 'none',
    background: '$accents1',
  },
  '.rc-tabs-tab-active': {
    fontWeight: 'bolder',
    background: '$accents2',
  },
  '.rc-tabs-tab-btn': {
    font: 'inherit',
    border: 0,
    paddingLeft: 10,
    paddingRight: 5,
  },
  '.rc-tabs-tab-remove': {
    border: 0,
    background: 'transparent',
  },
  '.rc-tabs-tab-remove:hover': {
    color: '$accents5',
  },
  '.rc-tabs-nav-add': {
    visibility: 'visible !important',
    border: 0,
    background: '$accents1',
    marginLeft: 10,
    fontSize: 12,
  },
  '.rc-tabs-nav-add:hover > svg': {
    border: 0,
    color: '$accents5',
  },
  '.rc-tabs-ink-bar': {
    height: 3,
    bottom: 0,
    background: '$primary',
    position: 'absolute',
    pointerEvents: 'none',
  },
  '.rc-tabs-ink-bar-animated': {
    transition: 'all 0.3s',
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

  showAddButton?: boolean;

  onActivate?: (key: string) => void;

  onAdd?: () => void;

  onClose?: (key: string) => void;

  onDragEnd?: (event: DragEndEvent) => void;
}

export const DraggableTabs: React.FC<DraggableTabsProps> = ({
  tabs,
  activeKey,
  showAddButton = false,
  onAdd,
  onClose,
  onActivate,
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

  const onTabsEdit = (
    type: string,
    info: { key?: string; event: React.MouseEvent | React.KeyboardEvent }
  ) => {
    if (type === 'remove' && onClose && info.key) {
      onClose(info.key);
    } else if (type === 'add' && onAdd) {
      onAdd();
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={tabs}>
        <StyledTabs
          animated={{ inkBar: true, tabPane: false }}
          editable={{
            showAdd: showAddButton,
            addIcon: <FontAwesomeIcon icon={faPlus} />,
            onEdit: onTabsEdit,
          }}
          activeKey={activeKey}
          onChange={onActivate}
          renderTabBar={(props, DefaultTabBar) => (
            <DefaultTabBar {...props}>
              {(node) => (
                <DraggableTab id={node.key as string}>
                  <Text h6 weight="light">
                    {node}
                  </Text>
                </DraggableTab>
              )}
            </DefaultTabBar>
          )}
        >
          {tabs.map((tab) => (
            <StyledTabPane
              key={tab.id}
              tab={tab.title}
              closable
              closeIcon={<FontAwesomeIcon icon={faXmark} />}
            >
              {tab.content}
            </StyledTabPane>
          ))}
        </StyledTabs>
      </SortableContext>
    </DndContext>
  );
};
