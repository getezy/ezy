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
  ({ css, data, nodeRenderer }) =>
    <StyledTree css={css}>{data.map((item) => nodeRenderer(item))}</StyledTree>;
