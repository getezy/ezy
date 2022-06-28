import {
  faArrowsRotate,
  faEllipsis,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { TreeFactory, TreeNode, TreeNodeRenderer } from '../../../components';
import { Collection, CollectionType, GRPCService } from '../../../storage';
import { ProtoBadge } from '../../collections/badge-types';
import { StyledNodeWrapper } from './node.styled';
import { grpcNodeRenderer } from './service.node';

const GRPCTree = TreeFactory<GRPCService>();

export const collectionNodeRenderer: TreeNodeRenderer<Collection<CollectionType>> = ({
  id,
  name,
  type,
  children,
}) => {
  const content = (
    <StyledNodeWrapper>
      {type === CollectionType.GRPC && (
        <>
          <ProtoBadge />
          <Spacer x={0.3} />
        </>
      )}
      <Tooltip content={name} color="invert" placement="topStart" enterDelay={300}>
        <Text size={12}>{name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  const commandsContent = (
    <Dropdown placement="right-top">
      <Dropdown.Button
        auto
        light
        size="xs"
        color="gradient"
        animated={false}
        css={{
          padding: 0,
          margin: 0,
          minWidth: 10,
          marginLeft: 'auto',
          color: '$accents9',
          '&:hover': {
            color: '$warning',
            backgroundColor: '$accents0',
          },
        }}
        icon={<FontAwesomeIcon icon={faEllipsis} />}
      />
      <Dropdown.Menu
        variant="flat"
        aria-label="actions"
        css={{ border: 'solid 1px $border', br: 15 }}
      >
        <Dropdown.Item
          color="default"
          icon={<FontAwesomeIcon icon={faArrowsRotate} />}
          description="Reload collection's protobuf"
        >
          Synchronize collection
        </Dropdown.Item>
        <Dropdown.Item
          color="default"
          icon={<FontAwesomeIcon icon={faPenToSquare} />}
          description="Open collection's settings"
        >
          Update collection
        </Dropdown.Item>
        <Dropdown.Item
          withDivider
          color="error"
          icon={<FontAwesomeIcon icon={faTrash} />}
          description="Permanently delete collection"
        >
          Delete collection
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <TreeNode id={id} key={id} content={content} commandsContent={commandsContent}>
      <GRPCTree data={children} nodeRenderer={grpcNodeRenderer} />
    </TreeNode>
  );
};
