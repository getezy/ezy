import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Tree, TreeNode, TreeNodeRenderer } from '../../../components';
import { GRPCPackage, GRPCService } from '../../../storage';
import { PackageBadge } from '../../collections/badge-types';
import { StyledNodeWrapper } from './node.styled';
import { grpcServiceNodeRenderer } from './service.node';

type GrpcPackageNodeProps = {
  id: string;
  name: string;
  services?: GRPCService[];

  isOpen?: boolean;
  onCollapseToggle?: (isOpen: boolean) => void;
};

const GrpcPackageNode: React.FC<GrpcPackageNodeProps> = ({
  id,
  name,
  services = [],
  isOpen,
  onCollapseToggle,
}) => {
  const content = (
    <StyledNodeWrapper>
      <PackageBadge />
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
      <Tree<GRPCService> data={services} nodeRenderer={grpcServiceNodeRenderer} />
    </TreeNode>
  );
};

export const grpcPackageNodeRenderer: TreeNodeRenderer<GRPCPackage> = (
  { id, name, services },
  { isOpen, onCollapseToggle }
) => (
  <GrpcPackageNode
    id={id}
    key={id}
    name={name}
    services={services}
    isOpen={isOpen}
    onCollapseToggle={onCollapseToggle}
  />
);
