import { styled } from '@nextui-org/react';
import React from 'react';

// @ts-ignore
const StyledMenuItem = styled('li', {});

export interface MenuItemProps {
  label: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label }) => (
  <StyledMenuItem>{label}</StyledMenuItem>
);
