import { CSS, styled } from '@nextui-org/react';
import React from 'react';

import { TreeNodeRenderer } from './tree-node';

const StyledTree = styled('ul', {
  margin: 0,
});

export type TreeData = {
  id: string;
  name: string;
};

export type TreeProps<T extends TreeData> = {
  css?: CSS;

  data: T[];

  nodeRenderer: TreeNodeRenderer<T>;
};

export const Tree: <T extends TreeData>(
  props: TreeProps<T>
) => React.ReactElement<TreeProps<T>> = ({ css, data, nodeRenderer }) => {
  const [isOpen, setIsOpen] = React.useState<boolean[]>(new Array(data.length).fill(true));

  const handleOpen = (index: number) => (value: boolean) => {
    setIsOpen([...isOpen.slice(0, index), value, ...isOpen.slice(index + 1)]);
  };

  const nodes = data.map((item, index) =>
    nodeRenderer(item, { isOpen: isOpen[index], onCollapseToggle: handleOpen(index) })
  );

  return <StyledTree css={css}>{nodes}</StyledTree>;
};
