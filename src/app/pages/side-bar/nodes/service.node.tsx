import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Tree, TreeNode, TreeNodeRendererProps } from '../../../components';
import { GrpcMethod, GrpcService } from '../../../storage';
import { ServiceBadge } from '../../collections/badge-types';
import { GrpcMethodNode } from './method.node';
import { StyledNodeWrapper } from './node.styled';

export const GrpcServiceNode: React.FC<TreeNodeRendererProps<GrpcService>> = ({
  data,
  isOpen,
  onCollapseToggle,
}) => {
  const content = (
    <StyledNodeWrapper>
      <ServiceBadge />
      <Spacer x={0.3} />
      <Tooltip content={data.name} placement="topStart" enterDelay={500}>
        <Text size={12}>{data.name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      css={{ paddingLeft: 10 }}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
      defaultPadding
    >
      <Tree<GrpcMethod> data={data.methods}>
        {data.methods?.map((method) => (
          <GrpcMethodNode id={method.id} key={method.id} data={method} />
        ))}
      </Tree>
    </TreeNode>
  );
};
