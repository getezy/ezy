import { Collapse, CSS, styled } from '@nextui-org/react';
import React from 'react';

// @ts-ignore
const StyledMenuItem = styled('li', {
  margin: 0,
  '& > div > div': {
    padding: 0,
  },
});

export interface MenuItemProps {
  label: string | React.ReactNode;

  content: React.ReactNode;

  contentLeft?: React.ReactNode;

  css?: CSS;
}

export const MenuItem: React.FC<MenuItemProps> = ({ label, css, content, contentLeft }) => (
  <StyledMenuItem>
    <Collapse
      title={label}
      divider={false}
      preventDefault={false}
      css={css}
      contentLeft={contentLeft}
    >
      {content}
    </Collapse>
  </StyledMenuItem>
);
