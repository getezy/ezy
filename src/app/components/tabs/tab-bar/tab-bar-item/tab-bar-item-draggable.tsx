import { useSortable } from '@dnd-kit/sortable';
import React, { PropsWithChildren } from 'react';

import { StyledTabBarItem, TabBarItemProps } from './tab-bar-item.styled';

export const TabBarItemDraggable = React.forwardRef<
  HTMLDivElement,
  PropsWithChildren<TabBarItemProps>
>(({ children, active = false, closable = false, onClick, id }, ref) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });

  const style: React.CSSProperties = {
    visibility: isDragging ? 'hidden' : 'visible',
    transform: transform ? `translate3d(${transform.x}px, 0px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <StyledTabBarItem active={active} closable={closable} ref={ref} onClick={onClick}>
        {children}
      </StyledTabBarItem>
    </div>
  );
});
