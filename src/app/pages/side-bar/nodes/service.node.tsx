import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { TreeFactory, TreeNode, TreeNodeRenderer } from '../../../components';
import { GRPCMethod, GRPCService } from '../../../storage';
import { ServiceBadge } from '../../collections/badge-types';
import { grpcMethodNodeRenderer } from './method.node';
import { StyledNodeWrapper } from './node.styled';

type GrpcServiceNodeProps = {
  id: string;
  name: string;
  methods: GRPCMethod[];

  isOpen?: boolean;
  onCollapseToggle?: (isOpen: boolean) => void;
};

const GRPCMethodTree = TreeFactory<GRPCMethod>();

const GrpcServiceNode: React.FC<GrpcServiceNodeProps> = ({
  id,
  name,
  methods,
  isOpen,
  onCollapseToggle,
}) => {
  const content = (
    <StyledNodeWrapper>
      <ServiceBadge />
      <Spacer x={0.3} />
      <Tooltip content={name} color="invert" placement="topStart" enterDelay={1000}>
        <Text size={12}>{name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  return (
    <TreeNode
      id={id}
      key={id}
      content={content}
      css={{ paddingLeft: 10 }}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
    >
      <GRPCMethodTree data={methods} nodeRenderer={grpcMethodNodeRenderer} />
    </TreeNode>
  );
};

export const grpcServiceNodeRenderer: TreeNodeRenderer<GRPCService> = (
  { id, name, methods },
  { isOpen, onCollapseToggle }
) => (
  <GrpcServiceNode
    id={id}
    name={name}
    methods={methods}
    isOpen={isOpen}
    onCollapseToggle={onCollapseToggle}
  />
);
