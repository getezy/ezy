import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../core/protobuf/interfaces';
import { TreeNode, TreeNodeRenderer } from '../../../components';
import { CollectionType, GrpcMethod, useTabsStore } from '../../../storage';
import { StreamBadge, UnaryBadge } from '../../collections/badge-types';
import { StyledNodeWrapper } from './node.styled';

type GrpcMethodNodeProps = {
  id: string;
  title: string;
  type: GrpcMethodType;
};

const GrpcMethodNode: React.FC<GrpcMethodNodeProps> = ({ id, title, type }) => {
  const { createTab } = useTabsStore((store) => store);

  const handleDoubleClick = () => {
    createTab({
      type: CollectionType.GRPC,
      title,
      info: {
        methodId: id,
      },
    });
  };

  const content = (
    <StyledNodeWrapper>
      {type === GrpcMethodType.UNARY && <UnaryBadge />}
      {type === GrpcMethodType.STREAM && <StreamBadge />}
      <Spacer x={0.3} />
      <Tooltip content={title} color="invert" placement="topStart" enterDelay={1000}>
        <Text size={12}>{title}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  return (
    <TreeNode
      id={id}
      key={id}
      content={content}
      css={{ paddingLeft: 20 }}
      onDoubleClick={handleDoubleClick}
    />
  );
};

export const grpcMethodNodeRenderer: TreeNodeRenderer<GrpcMethod> = ({ id, type, name }) => (
  <GrpcMethodNode id={id} key={id} type={type} title={name} />
);
