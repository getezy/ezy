import { Collapse, CSS, styled } from '@nextui-org/react';
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
    backgroundColor: '$accents2',
  },
  '&::-webkit-scrollbar-thumb': {
    boxShadow: 'inset 0 0 6px',
    color: '$accents5',
  },
});

export interface MenuProps {
  items: MenuItemProps[];

  css?: CSS;
}

export const Menu: React.FC<MenuProps> = ({ items, css }) => (
  <StyledMenu css={css}>
    <Collapse.Group>
      {items?.map((item) => (
        <MenuItem
          css={item.css}
          label={item.label}
          content={item.content}
          contentLeft={item.contentLeft}
        />
      ))}
    </Collapse.Group>
  </StyledMenu>
);
