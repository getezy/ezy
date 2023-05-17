import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CSS, Text } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { useOnScreen, useRefs } from '../hooks';
import { TabProps } from '../tab';
import { ActiveBar, ActiveBarProps } from './active-bar';
import { StyledTabBar, TabBarRightNodeWrapper, TabBarWrapper } from './tab-bar.styled';
import { TabBarItem, TabBarItemDraggable } from './tab-bar-item';

export type TabBarProps = {
  /**
   * ActiveBar options.
   */
  activeBar?: ActiveBarProps;

  /**
   * Active tab key.
   */
  activeKey?: string;

  /**
   * Weather tab bar is draggable or not.
   */
  draggable?: boolean;

  /**
   * Fixed right node
   */
  rightNode?: React.ReactNode;

  /**
   * Fires on tab click.
   */
  onTabActivate?: (key: string) => void;

  /**
   * Fires on tab close.
   */
  onTabClose?: (key: string) => void;

  /**
   * Fires on tab drag end.
   */
  onTabDragEnd?: (current: string, over: string) => void;
};

function renderTabBarItemContent(
  child: React.ReactElement<TabProps>,
  { onTabClose }: TabBarProps
): React.ReactElement {
  const { title, id, closable = false } = child.props;

  return (
    <>
      <Text>{title}</Text>
      {closable && (
        <Button
          auto
          light
          color="default"
          size="xs"
          css={{
            '&:hover': {
              color: '$warning',
              backgroundColor: '$accents0',
            },
            marginLeft: 5,
            marginRight: 5,
            minWidth: 5,
          }}
          icon={<FontAwesomeIcon size="sm" icon={faXmark} />}
          onClick={onTabClose ? () => onTabClose(id) : undefined}
        />
      )}
    </>
  );
}

function renderTabBarItem(
  child: React.ReactElement<TabProps>,
  { activeKey, onTabActivate, onTabClose }: TabBarProps,
  ref?: React.RefObject<HTMLDivElement>
): React.ReactElement {
  const { id, closable = false } = child.props;

  return (
    <TabBarItem
      active={id === activeKey}
      closable={closable}
      key={id}
      id={id}
      onClick={onTabActivate ? () => onTabActivate(id) : undefined}
      ref={ref}
    >
      {renderTabBarItemContent(child, { onTabClose })}
    </TabBarItem>
  );
}

function renderTabBarItemDraggable(
  child: React.ReactElement<TabProps>,
  { activeKey, onTabActivate, onTabClose }: TabBarProps,
  ref?: React.RefObject<HTMLDivElement>
): React.ReactElement {
  const { id, closable = false } = child.props;

  return (
    <TabBarItemDraggable
      active={id === activeKey}
      closable={closable}
      key={id}
      id={id}
      onClick={onTabActivate ? () => onTabActivate(id) : undefined}
      ref={ref}
    >
      {renderTabBarItemContent(child, { onTabClose })}
    </TabBarItemDraggable>
  );
}

export const TabBar: React.FC<PropsWithChildren<TabBarProps>> = ({
  children,
  activeBar,
  activeKey,
  draggable = false,
  rightNode,
  onTabActivate,
  onTabClose,
  onTabDragEnd = () => {},
}) => {
  const [activeBarStyles, setActiveBarStyles] = React.useState<CSS>({});
  const [activeDraggingItem, setActiveDraggingItem] = React.useState<string>();

  const [getRef] = useRefs<HTMLDivElement>();
  const tabBarRef = React.useRef<HTMLDivElement>(null);
  const isTabBarVisible = useOnScreen(tabBarRef);

  const tabBarItems = React.Children.toArray(children) as React.ReactElement<TabProps>[];

  const activeTabBarItemIndex = tabBarItems.findIndex((item) => item.props.id === activeKey);

  const moveToActive = () => {
    if (activeKey) {
      const activeTabBarItem = getRef(activeKey);

      activeTabBarItem.current?.scrollIntoView();

      setActiveBarStyles({
        width: activeTabBarItem.current?.clientWidth,
        left: activeTabBarItem.current?.offsetLeft,
      });
    } else {
      setActiveBarStyles({
        width: 0,
        left: 0,
      });
    }
  };

  React.useEffect(() => {
    moveToActive();
  }, [activeKey, tabBarItems.length, activeTabBarItemIndex, isTabBarVisible]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 30,
      },
    })
  );

  if (draggable) {
    const handleDragStart = (event: DragStartEvent) => {
      setActiveDraggingItem(event.active.id as string);
    };

    const handleDragEnd = (event: DragEndEvent) => {
      onTabDragEnd(event.active.id as string, event.over?.id as string);
      setActiveDraggingItem(undefined);
    };

    return (
      <TabBarWrapper>
        <StyledTabBar ref={tabBarRef}>
          <DndContext
            autoScroll
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={tabBarItems.map((tab) => ({ id: tab.props.id }))}
              strategy={horizontalListSortingStrategy}
            >
              {tabBarItems.map((child) =>
                renderTabBarItemDraggable(
                  child,
                  { activeKey, onTabActivate, onTabClose, draggable },
                  getRef(child.props.id)
                )
              )}
              <ActiveBar {...activeBar} css={activeBarStyles} />
            </SortableContext>
            <DragOverlay
              adjustScale={false}
              zIndex={1}
              modifiers={[restrictToParentElement, restrictToHorizontalAxis]}
            >
              {activeDraggingItem
                ? renderTabBarItem(
                    tabBarItems.find((item) => item.props.id === activeDraggingItem)!,
                    {
                      activeKey,
                    }
                  )
                : null}
            </DragOverlay>
          </DndContext>
        </StyledTabBar>
        {rightNode && <TabBarRightNodeWrapper>{rightNode}</TabBarRightNodeWrapper>}
      </TabBarWrapper>
    );
  }

  return (
    <TabBarWrapper>
      <StyledTabBar ref={tabBarRef}>
        {tabBarItems.map((child) =>
          renderTabBarItem(
            child,
            { activeKey, onTabActivate, onTabClose, draggable },
            getRef(child.props.id)
          )
        )}
        <ActiveBar {...activeBar} css={activeBarStyles} />
      </StyledTabBar>
      {rightNode && <TabBarRightNodeWrapper>{rightNode}</TabBarRightNodeWrapper>}
    </TabBarWrapper>
  );
};
