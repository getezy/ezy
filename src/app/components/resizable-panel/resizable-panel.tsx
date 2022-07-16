import { styled, VariantProps } from '@nextui-org/react';
import { Enable as ResizableEnableOptions, Resizable } from 're-resizable';
import React from 'react';

const ResizablePanelWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  variants: {
    alignment: {
      horizontal: {
        flexDirection: 'column',
      },
      vertical: {
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
      horizontal: {
        $$minHeight: '150px',
        minHeight: '$$minHeight',
        maxHeight: 'calc(100% - $$minHeight)',
      },
      vertical: {
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

  variants: {
    alignment: {
      horizontal: {
        borderTop: 'solid 1px $border',
      },
      vertical: {
        borderLeft: 'solid 1px $border',
      },
    },
  },
});

export type ResizablePanelProps = {
  firstNode: React.ReactNode;
  secondNode: React.ReactNode;
} & VariantProps<typeof ResizablePanelWrapper>;

export const ResizablePanel: React.FC<React.PropsWithChildren<ResizablePanelProps>> = ({
  alignment = 'vertical',
  firstNode,
  secondNode,
}) => {
  const enableOptions: ResizableEnableOptions =
    alignment === 'vertical' ? { right: true } : { bottom: true };

  const defaultSize =
    alignment === 'vertical' ? { width: '50%', height: '100%' } : { width: '100%', height: '50%' };

  return (
    <ResizablePanelWrapper alignment={alignment}>
      <StyledResizable alignment={alignment} enable={enableOptions} defaultSize={defaultSize}>
        {firstNode}
      </StyledResizable>
      <StyledSecondNode alignment={alignment}>{secondNode}</StyledSecondNode>
    </ResizablePanelWrapper>
  );
};
