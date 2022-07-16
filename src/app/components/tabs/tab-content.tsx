import { styled, VariantProps } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

const StyledTabContent = styled('div', {
  display: 'flex',
  flex: 1,
  overflow: 'hidden',

  variants: {
    active: {
      false: {
        display: 'none',
      },
    },
  },
});

export type TabContentProps = {} & VariantProps<typeof StyledTabContent>;

export const TabContent: React.FC<PropsWithChildren<TabContentProps>> = ({
  children,
  active = false,
}) => <StyledTabContent active={active}>{children}</StyledTabContent>;
