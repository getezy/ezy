import { styled } from '@nextui-org/react';
import React from 'react';

import { MenuItem, MenuItemProps } from './MenuItem';

// @ts-ignore
const StyledMenu = styled('ul', {});

export interface MenuProps {
  items: MenuItemProps[];
}

export const List: React.FC<MenuProps> = ({ items }) => (
  <StyledMenu>
    {items?.map((item, index) => (
      <MenuItem
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        label={item.label}
      />
    ))}
  </StyledMenu>
);
