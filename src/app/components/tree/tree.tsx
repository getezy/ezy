import { CSS, styled } from '@nextui-org/react';
import React from 'react';

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

  nodeRenderer: (node: T) => React.ReactElement;
};

export const TreeFactory =
  <T extends TreeData>(): React.FC<TreeProps<T>> =>
  ({ css, data, nodeRenderer }) =>
    <StyledTree css={css}>{data.map((item) => nodeRenderer(item))}</StyledTree>;
