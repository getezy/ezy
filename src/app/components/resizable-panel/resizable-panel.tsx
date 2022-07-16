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
  flexDirection: 'column',
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
  display: 'flex',

  width: '100%',
  height: '100%',

  overflow: 'hidden',
  variants: {
    alignment: {
      [ResizablePanelAlignment.Horizontal]: {
        $$minHeight: '150px',
        minHeight: '$$minHeight',
        maxHeight: 'calc(100% - $$minHeight)',
      },
      [ResizablePanelAlignment.Vertical]: {
        $$minWidth: '150px',
        minWidth: '$$minWidth',
        maxWidth: 'calc(100% - $$minWidth)',
      },
    },
  },
});

const StyledSecondNode = styled('div', {
  display: 'flex',

  width: '100%',
  height: '100%',

  overflow: 'hidden',
});

export const ResizablePanel: React.FC<React.PropsWithChildren<ResizablePanelProps>> = ({
  alignment = ResizablePanelAlignment.Vertical,
  firstNode,
  secondNode,
}) => {
  const enableOptions: ResizableEnableOptions =
    alignment === ResizablePanelAlignment.Vertical ? { right: true } : { bottom: true };

  const defaultSize =
    alignment === ResizablePanelAlignment.Vertical
      ? { width: '50%', height: '100%' }
      : { width: '100%', height: '50%' };

  return (
    <ResizablePanelWrapper alignment={alignment}>
      <StyledResizable alignment={alignment} enable={enableOptions} defaultSize={defaultSize}>
        {firstNode}
      </StyledResizable>
      <StyledSecondNode>{secondNode}</StyledSecondNode>
    </ResizablePanelWrapper>
  );
};
