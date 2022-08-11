import { Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../core/protobuf/interfaces';
import { TreeNode, TreeNodeRendererProps } from '../../../components';
import { CollectionType, GrpcMethod, useCollectionsStore, useTabsStore } from '../../../storage';
import { StreamBadge, UnaryBadge } from '../../collections/badge-types';
import { StyledNodeWrapper } from './node.styled';

export const GrpcMethodNode: React.FC<TreeNodeRendererProps<GrpcMethod>> = ({ data }) => {
  const { createGrpcTab } = useTabsStore((store) => store);
  const collections = useCollectionsStore((store) => store.collections);

  const handleDoubleClick = () => {
    const nodeCollection = collections.find((collection) =>
      collection.children?.find((service) =>
        service.methods?.find((method) => method.id === data.id)
      )
    );

    const nodeService = nodeCollection?.children?.find((service) =>
      service.methods?.find((method) => method.id === data.id)
    );

    if (nodeCollection && nodeService) {
      createGrpcTab({
        type: CollectionType.GRPC,
        title: data.name,
        info: {
          collectionId: nodeCollection.id,
          serviceId: nodeService.id,
          methodId: data.id,
          methodType: data.type,
        },
      });
    }
  };

  const content = (
    <StyledNodeWrapper>
      {data.type === GrpcMethodType.UNARY && <UnaryBadge />}
      {data.type !== GrpcMethodType.UNARY && <StreamBadge type={data.type} />}
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
      css={{ paddingLeft: 20 }}
      onDoubleClick={handleDoubleClick}
      defaultPadding
    />
  );
};
