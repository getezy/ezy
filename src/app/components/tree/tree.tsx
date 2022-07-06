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

  data?: T[];

  nodeRenderer: TreeNodeRenderer<T>;
};

export const Tree: <T extends TreeData>(
  props: TreeProps<T>
) => React.ReactElement<TreeProps<T>> = ({ css, data = [], nodeRenderer }) => {
  const isOpenDefaultState = data.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: true,
    }),
    {}
  );

  const [isOpen, setIsOpen] = React.useState<{ [key: string]: boolean }>(isOpenDefaultState);

  const handleIsOpen = (id: string) => (value: boolean) => {
    setIsOpen({
      ...isOpen,
      [id]: value,
    });
  };

  const nodes = data.map((item) =>
    nodeRenderer(item, {
      isOpen: isOpen[item.id],
      onCollapseToggle: handleIsOpen(item.id),
    })
  );

  return <StyledTree css={css}>{nodes}</StyledTree>;
};
