import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Tree, TreeNode, TreeNodeRenderer } from '../../../components';
import { GrpcMethod, GrpcService } from '../../../storage';
import { ServiceBadge } from '../../collections/badge-types';
import { grpcMethodNodeRenderer } from './method.node';
import { StyledNodeWrapper } from './node.styled';

type GrpcServiceNodeProps = {
  node: GrpcService;

  isOpen?: boolean;
  onCollapseToggle?: (isOpen: boolean) => void;
};

const GrpcServiceNode: React.FC<GrpcServiceNodeProps> = ({ node, isOpen, onCollapseToggle }) => {
  const content = (
    <StyledNodeWrapper>
      <ServiceBadge />
      <Spacer x={0.3} />
      <Tooltip content={node.name} color="invert" placement="topStart" enterDelay={1000}>
        <Text size={12}>{node.name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  return (
    <TreeNode
      id={node.id}
      key={node.id}
      content={content}
      css={{ paddingLeft: 10 }}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
    >
      <Tree<GrpcMethod> data={node.methods} nodeRenderer={grpcMethodNodeRenderer} />
    </TreeNode>
  );
};

export const grpcServiceNodeRenderer: TreeNodeRenderer<GrpcService> = (
  data,
  { isOpen, onCollapseToggle }
) => (
  <GrpcServiceNode key={data.id} node={data} isOpen={isOpen} onCollapseToggle={onCollapseToggle} />
);
