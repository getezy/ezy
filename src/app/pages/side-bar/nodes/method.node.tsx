import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../core/protobuf/interfaces';
import { TreeNode, TreeNodeRenderer } from '../../../components';
import { CollectionType, GrpcMethod, useCollectionsStore, useTabsStore } from '../../../storage';
import { StreamBadge, UnaryBadge } from '../../collections/badge-types';
import { StyledNodeWrapper } from './node.styled';

type GrpcMethodNodeProps = {
  node: GrpcMethod;
};

const GrpcMethodNode: React.FC<GrpcMethodNodeProps> = ({ node }) => {
  const { createGrpcTab } = useTabsStore((store) => store);
  const collections = useCollectionsStore((store) => store.collections);

  const handleDoubleClick = () => {
    const nodeCollection = collections.find((collection) =>
      collection.children?.find((service) =>
        service.methods?.find((method) => method.id === node.id)
      )
    );

    const nodeService = nodeCollection?.children?.find((service) =>
      service.methods?.find((method) => method.id === node.id)
    );

    if (nodeCollection && nodeService) {
      createGrpcTab({
        type: CollectionType.GRPC,
        title: node.name,
        info: {
          collectionId: nodeCollection.id,
          serviceId: nodeService.id,
          methodId: node.id,
          methodType: node.type,
        },
      });
    }
  };

  const content = (
    <StyledNodeWrapper>
      {node.type === GrpcMethodType.UNARY && <UnaryBadge />}
      {node.type !== GrpcMethodType.UNARY && <StreamBadge type={node.type} />}
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
      css={{ paddingLeft: 20 }}
      onDoubleClick={handleDoubleClick}
    />
  );
};

export const grpcMethodNodeRenderer: TreeNodeRenderer<GrpcMethod> = (data) => (
  <GrpcMethodNode key={data.id} node={data} />
);
