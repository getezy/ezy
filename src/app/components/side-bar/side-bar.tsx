import { Collapse, CSS, styled } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';

import { SideBarItem, SideBarItemProps } from './side-bar-item';

const StyleSideBar = styled('ul', {
  display: 'flex',
  flexWrap: 'nowrap',
  flexDirection: 'column',
  overflow: 'auto',
  margin: 0,
  '&::-webkit-scrollbar': {
    width: 2,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '$accents1',
  },
  '&::-webkit-scrollbar-thumb': {
    boxShadow: 'inset 0 0 6px',
    color: '$accents5',
  },
});

const StyledCollapseGroup = styled(Collapse.Group, {
  paddingLeft: 10,
  paddingRight: 5,
});
export interface SideBarProps {
  items: SideBarItemProps[];

  css?: CSS;
}

export const SideBar: React.FC<SideBarProps> = ({ items, css }) => (
  <StyleSideBar css={css}>
    <StyledCollapseGroup>
      {items?.map((item) => (
        <SideBarItem
          key={nanoid()}
          css={item.css}
          label={item.label}
          content={item.content}
          contentLeft={item.contentLeft}
        />
      ))}
    </StyledCollapseGroup>
  </StyleSideBar>
);
