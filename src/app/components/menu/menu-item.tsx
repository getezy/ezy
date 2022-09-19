import { styled, VariantProps } from '@nextui-org/react';
import React from 'react';

const StyledMenuItem = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  padding: 10,

  '&:hover': {
    color: '$ezy',
  },

  variants: {
    active: {
      true: {
        color: '$ezy',
      },
      false: {
        color: '$accents5',
      },
    },
  },
});

const IconWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: 30,
  height: 30,

  variants: {
    active: {
      true: {
        transition: 'all 0.2s ease',
        bs: '$xs',
        br: '$squared',
        backgroundColor: '$accents1',
      },
      false: {
        backgroundColor: 'transparent',
      },
    },
  },
});

export type MenuItemData = {
  key: string;

  icon: React.ReactElement;

  // eslint-disable-next-line react/no-unused-prop-types
  submenu?: React.ReactElement;
};

export type MenuItemProps = MenuItemData & {
  onClick?: () => void;
} & VariantProps<typeof StyledMenuItem>;

export const MenuItem: React.FC<MenuItemProps> = ({ key, icon, active = false, onClick }) => (
  <StyledMenuItem key={key} active={active} onClick={onClick}>
    <IconWrapper active={active}>{icon}</IconWrapper>
  </StyledMenuItem>
);
