import { Collapse, CSS, styled } from '@nextui-org/react';
import React from 'react';

// @ts-ignore
const StyledMenuItem = styled('li', {
  marginLeft: 20,
  marginRight: 20,
});

export interface MenuItemProps {
  label: string;

  css?: CSS;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label, css }) => (
  <StyledMenuItem>
    <Collapse title={label} divider={false} preventDefault={false} css={css}>
      {label}
    </Collapse>
  </StyledMenuItem>
);
