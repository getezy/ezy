import { Collapse, CSS, styled } from '@nextui-org/react';
import React from 'react';

const StyledSideBarItem = styled('li', {
  margin: 0,
  '& > div > div': {
    padding: 0,
  },
});

export interface SideBarItemProps {
  label: string | React.ReactNode;

  content: React.ReactNode;

  contentLeft?: React.ReactNode;

  css?: CSS;
}

export const SideBarItem: React.FC<SideBarItemProps> = ({ label, css, content, contentLeft }) => (
  <StyledSideBarItem>
    <Collapse
      title={label}
      divider={false}
      preventDefault={false}
      css={css}
      contentLeft={contentLeft}
    >
      {content}
    </Collapse>
  </StyledSideBarItem>
);
