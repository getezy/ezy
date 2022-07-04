import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { TreeNode, TreeNodeRenderer } from '../../../components';
import { GRPCMethod, GRPCMethodType, useTabsStore } from '../../../storage';
import { StreamBadge, UnaryBadge } from '../../collections/badge-types';
import { StyledNodeWrapper } from './node.styled';

type GrpcMethodNodeProps = {
  id: string;
  name: string;
  type: GRPCMethodType;
};

const GrpcMethodNode: React.FC<GrpcMethodNodeProps> = ({ id, name, type }) => {
  const { createTab } = useTabsStore((store) => store);

  const handleDoubleClick = () => {
    createTab({
      title: name,
    });
  };

  const content = (
    <StyledNodeWrapper>
      {type === GRPCMethodType.UNARY && <UnaryBadge />}
      {type === GRPCMethodType.STREAM && <StreamBadge />}
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
      css={{ paddingLeft: 30 }}
      onDoubleClick={handleDoubleClick}
    />
  );
};

export const grpcMethodNodeRenderer: TreeNodeRenderer<GRPCMethod> = ({ id, type, name }) => (
  <GrpcMethodNode id={id} key={id} type={type} name={name} />
);
