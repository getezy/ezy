import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { TreeFactory, TreeNode } from '../../../components';
import { GRPCMethod, GRPCService } from '../../../storage';
import { ServiceBadge } from '../../collections/badge-types';
import { grpcMethodNodeRenderer } from './method.node';
import { StyledNodeWrapper } from './node.styled';

const GRPCMethodTree = TreeFactory<GRPCMethod>();

export const grpcNodeRenderer = ({ id, name, methods }: GRPCService) => {
  const content = (
    <StyledNodeWrapper>
      <ServiceBadge />
      <Spacer x={0.3} />
      <Tooltip content={name} color="invert" placement="topStart" enterDelay={300}>
        <Text size={12}>{name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  return (
    <TreeNode id={id} content={content} css={{ paddingLeft: 10 }}>
      <GRPCMethodTree data={methods} nodeRenderer={grpcMethodNodeRenderer} />
    </TreeNode>
  );
};
