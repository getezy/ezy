import { CSS, styled } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { CollapseButton } from './collapse.button';

const StyledTreeNode = styled('li', {
  display: 'flex',
  flexWrap: 'nowrap',
  paddingTop: 10,
  paddingBottom: 10,
  paddingRight: 5,
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
});

export type TreeNodeProps = {
  id: string;

  content: string | React.ReactNode;
  commandsContent?: React.ReactNode;

  isOpen?: boolean;

  onCollapseToggle?: (isOpen: boolean) => void;

  onClick?: (id: string) => void;

  onDoubleClick?: (id: string) => void;

  css?: CSS;
};

export type TreeNodeRendererProps<T> = Partial<TreeNodeProps> & {
  data: T;
};

export const TreeNode: React.FC<PropsWithChildren<TreeNodeProps>> = ({
  id,
  content,
  commandsContent,
  children,
  isOpen = true,
  onCollapseToggle,
  onClick,
  onDoubleClick,
  css,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const isCollapsible = !!children;

  const handleCollapseToggle = () => {
    if (isCollapsible && onCollapseToggle) {
      onCollapseToggle(!isOpen);
    }
  };

  const handleClick = () => {
    handleCollapseToggle();

    if (onClick) {
      onClick(id);
    }
  };

  const handleDoubleClick = () => {
    if (onDoubleClick) {
      onDoubleClick(id);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <StyledTreeNode
        key={id}
        css={css}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {content}
        <StyledCommandsPanelWrapper>
          {isHovered && commandsContent}
          {isCollapsible && <CollapseButton isOpen={isOpen} onClick={handleCollapseToggle} />}
        </StyledCommandsPanelWrapper>
      </StyledTreeNode>
      <div style={{ display: isOpen ? 'inherit' : 'none' }}>{children}</div>
    </>
  );
};
