import { styled } from '@nextui-org/react';
import { Enable as ResizableEnableOptions, Resizable } from 're-resizable';
import React from 'react';

export enum ResizablePanelAlignment {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

export interface ResizablePanelProps {
  firstNode: React.ReactNode;
  secondNode: React.ReactNode;
  alignment?: ResizablePanelAlignment;
}

const ResizablePanelWrapper = styled('div', {
  display: 'flex',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  variants: {
    alignment: {
      [ResizablePanelAlignment.Horizontal]: {
        flexDirection: 'column',
      },
      [ResizablePanelAlignment.Vertical]: {
        flexDirection: 'row',
      },
    },
  },
});

const StyledResizable = styled(Resizable, {
  variants: {
    alignment: {
      [ResizablePanelAlignment.Horizontal]: {
        $$minHeight: '40px',
        minHeight: '$$minHeight',
        maxHeight: 'calc(100% - $$minHeight)',
      },
      [ResizablePanelAlignment.Vertical]: {
        $$minWidth: '40px',
        minWidth: '$$minWidth',
        maxWidth: 'calc(100% - $$minWidth)',
      },
    },
  },
});

export const ResizablePanel: React.FC<React.PropsWithChildren<ResizablePanelProps>> = ({
  alignment = ResizablePanelAlignment.Vertical,
  firstNode,
  secondNode,
}) => {
  const enableOptions: ResizableEnableOptions =
    alignment === ResizablePanelAlignment.Vertical ? { right: true } : { bottom: true };

  return (
    <ResizablePanelWrapper alignment={alignment}>
      <StyledResizable alignment={alignment} enable={enableOptions}>
        {firstNode}
      </StyledResizable>
      {secondNode}
    </ResizablePanelWrapper>
  );
};
