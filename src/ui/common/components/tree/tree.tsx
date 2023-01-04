import { CSS, styled } from '@nextui-org/react';
import React, { PropsWithChildren } from 'react';

import { TreeNodeProps } from './tree-node';

const StyledTree = styled('ul', {
  margin: 0,
});

export type TreeData = {
  id: string;
};

export type TreeProps<T extends TreeData> = {
  css?: CSS;

  data?: T[];

  defaultIsOpen?: boolean;
};

export const Tree: <T extends TreeData>(
  props: PropsWithChildren<TreeProps<T>>
) => React.ReactElement<TreeProps<T>> = ({ css, data = [], defaultIsOpen = true, children }) => {
  const isOpenDefaultState = data.reduce(
    (acc, item) => ({
      ...acc,
      [item.id]: defaultIsOpen,
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

  const nodes = (React.Children.toArray(children) as React.ReactElement<TreeNodeProps>[]).map(
    (node) =>
      React.cloneElement(node, {
        isOpen: isOpen[node.props.id] !== undefined ? isOpen[node.props.id] : defaultIsOpen,
        onCollapseToggle: handleIsOpen(node.props.id),
      })
  );

  return <StyledTree css={css}>{nodes}</StyledTree>;
};
