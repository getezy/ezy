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

export const TreeFactory =
  <T extends TreeData>(): React.FC<TreeProps<T>> =>
  ({ css, data, nodeRenderer }) => {
    const nodes = data.map((item) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [isOpen, setIsOpen] = React.useState(true);

      return nodeRenderer(item, { isOpen, onCollapseToggle: setIsOpen });
    });

    return <StyledTree css={css}>{nodes}</StyledTree>;
  };
