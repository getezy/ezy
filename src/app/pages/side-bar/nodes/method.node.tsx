import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { TreeNode, TreeNodeRenderer } from '../../../components';
import { GRPCMethod, GRPCMethodType } from '../../../storage';
import { StreamBadge, UnaryBadge } from '../../collections/badge-types';
import { StyledNodeWrapper } from './node.styled';

export const grpcMethodNodeRenderer: TreeNodeRenderer<GRPCMethod> = ({ id, type, name }) => {
  const content = (
    <StyledNodeWrapper>
      {type === GRPCMethodType.UNARY && <UnaryBadge />}
      {type === GRPCMethodType.STREAM && <StreamBadge />}
      <Spacer x={0.3} />
      <Tooltip content={name} color="invert" placement="topStart" enterDelay={300}>
        <Text size={12}>{name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  return <TreeNode id={id} key={id} content={content} css={{ paddingLeft: 20 }} />;
};
