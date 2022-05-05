import { CSS, styled } from '@nextui-org/react';
import React from 'react';

import { MenuItem, MenuItemProps } from './MenuItem';

// @ts-ignore
const StyledMenu = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  margin: 0,
  scrollbarWidth: 100,
  scrollbarColor: '#6969dd #e0e0e0',
  '&::-webkit-scrollbar': {
    width: 2,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '$accents5',
  },
  '&::-webkit-scrollbar-thumb': {
    // boxShadow: 'inset 0 0 6px rgba(120, 0, 0, 0.3)',
    boxShadow: 'inset 0 0 6px',
    color: '$gray300',
  },
});

export interface MenuProps {
  items: MenuItemProps[];

  css?: CSS;
}

export const Menu: React.FC<MenuProps> = ({ items, css }) => (
  <StyledMenu css={css}>
    {items?.map((item) => (
      <MenuItem css={item.css} label={item.label} />
    ))}
  </StyledMenu>
);
