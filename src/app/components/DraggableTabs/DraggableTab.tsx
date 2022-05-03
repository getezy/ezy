import { useSortable } from '@dnd-kit/sortable';
import React from 'react';

interface DraggableTabProps {
  id: string;

  children?: React.ReactNode;
}

export const DraggableTab: React.FC<DraggableTabProps> = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, 0px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};
