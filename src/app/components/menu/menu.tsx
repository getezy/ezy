import { styled } from '@nextui-org/react';
import React from 'react';

import { MenuItem, MenuItemData } from './menu-item';

const StyledMenu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  width: 50,
  maxWidth: 50,

  backgroundColor: '$background',

  borderRight: 'solid 0.1px $border',
});

const SubMenu = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  transition: 'all 0.2s ease',

  borderRight: 'solid 0.1px $border',

  variants: {
    isCollapsed: {
      true: {
        '& div': {
          display: 'none',
        },
        width: 0,
      },
      false: {
        width: 250,
      },
    },
  },
});

const TopContainer = styled('div', {
  borderBottom: 'solid 0.1px $border',
});

const BottomContainer = styled('div', {
  marginTop: 'auto',
});

export interface MenuProps {
  items: MenuItemData[];

  top?: React.ReactNode;

  bottom?: React.ReactNode;

  isCollapsed?: boolean;

  onCollapseChange?: (isCollapsed: boolean) => void;
}

export const Menu: React.FC<MenuProps> = ({
  items,
  bottom,
  top,
  isCollapsed = false,
  onCollapseChange,
}) => {
  // const [isCollapsed, setIsCollapsed] = React.useState(true);
  const [activeItem, setActiveItem] = React.useState<string>(items[0].key);

  const handleMenuItemClick = (index: string) => {
    if (index === activeItem && onCollapseChange) {
      onCollapseChange(!isCollapsed);
    } else {
      setActiveItem(index);
    }
  };

  const submenu = items.find((item) => item.key === activeItem)?.submenu;

  return (
    <>
      <StyledMenu>
        <TopContainer>{top}</TopContainer>
        {items.map((item) => (
          <MenuItem
            {...item}
            active={item.key === activeItem}
            onClick={() => {
              handleMenuItemClick(item.key);
            }}
          />
        ))}
        <BottomContainer>{bottom}</BottomContainer>
      </StyledMenu>
      <SubMenu isCollapsed={isCollapsed}>{!!submenu && submenu}</SubMenu>
    </>
  );
};
