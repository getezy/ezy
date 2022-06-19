import React, { PropsWithChildren } from 'react';

import { StyledTabBarItem, TabBarItemProps } from './tab-bar-item.styled';

export const TabBarItem = React.forwardRef<HTMLDivElement, PropsWithChildren<TabBarItemProps>>(
  ({ children, active = false, closable = false, onClick }, ref) => (
    <StyledTabBarItem active={active} closable={closable} ref={ref} onClick={onClick}>
      {children}
    </StyledTabBarItem>
  )
);
