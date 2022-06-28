import { CSS, styled } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { CollapseButton } from './collapse.button';

const StyledTreeNode = styled('li', {
  display: 'flex',
  flexWrap: 'nowrap',
  paddingTop: 10,
  paddingBottom: 10,
  margin: 0,
  overflow: 'auto',

  '&:hover': {
    backgroundColor: '$accents1',
  },
});

const StyledCommandsPanelWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  marginLeft: 'auto',
  width: '50px',
});

export type TreeNodeProps = {
  id: string;

  content: string | React.ReactNode;
  commandsContent?: React.ReactNode;

  onClick?: React.MouseEventHandler<HTMLLIElement>;

  css?: CSS;
};

export const TreeNode: React.FC<PropsWithChildren<TreeNodeProps>> = ({
  id,
  content,
  commandsContent,
  children,
  onClick,
  css,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const isCollapsible = !!children;

  const handleTreeNodeClick: React.MouseEventHandler<HTMLLIElement> = (event) => {
    if (isCollapsible) {
      setIsOpen(!isOpen);
    }

    if (onClick) {
      onClick(event);
    }
  };

  return (
    <>
      <StyledTreeNode key={id} css={css} onClick={handleTreeNodeClick}>
        {content}
        {isCollapsible && (
          <StyledCommandsPanelWrapper>
            {commandsContent}
            <CollapseButton isOpen={isOpen} onClick={setIsOpen} />
          </StyledCommandsPanelWrapper>
        )}
      </StyledTreeNode>
      {isOpen && children}
    </>
  );
};
