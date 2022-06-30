import {
  faArrowsRotate,
  faEllipsis,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Tree, TreeNode, TreeNodeRenderer } from '../../../components';
import {
  Collection,
  CollectionChildren,
  CollectionType,
  GRPCService,
  useCollectionsStore,
} from '../../../storage';
import { ProtoBadge } from '../../collections/badge-types';
import { StyledNodeWrapper } from './node.styled';
import { grpcServiceNodeRenderer } from './service.node';

type CollectionNodeProps = {
  id: string;
  name: string;
  type: CollectionType;

  data?: CollectionChildren<CollectionType>;

  isOpen?: boolean;
  onCollapseToggle?: (isOpen: boolean) => void;
};

const CollectionNode: React.FC<CollectionNodeProps> = ({
  id,
  name,
  type,
  data = [],
  isOpen,
  onCollapseToggle,
}) => {
  const { removeCollection } = useCollectionsStore((store) => store);

  const handleSelectionChange = (keys: 'all' | Set<string | number>) => {
    if (typeof keys !== 'string') {
      if (keys.has('delete')) {
        removeCollection(id);
      }
    }
  };

  const content = (
    <StyledNodeWrapper>
      {type === CollectionType.GRPC && (
        <>
          <ProtoBadge />
          <Spacer x={0.3} />
        </>
      )}
      <Tooltip content={name} color="invert" placement="topStart" enterDelay={1000}>
        <Text size={12}>{name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  const commandsContent = (
    <Dropdown placement="right-top" disableAnimation>
      <Dropdown.Button
        auto
        light
        size="xs"
        color="gradient"
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
        selectionMode="single"
        css={{ border: 'solid 1px $border', br: 15 }}
        onSelectionChange={handleSelectionChange}
      >
        <Dropdown.Item
          key="synchronize"
          color="default"
          icon={<FontAwesomeIcon icon={faArrowsRotate} />}
          description="Reload collection's protobuf"
        >
          Synchronize
        </Dropdown.Item>
        <Dropdown.Item
          key="settings"
          color="default"
          icon={<FontAwesomeIcon icon={faPenToSquare} />}
          description="Open collection's settings"
        >
          Settings
        </Dropdown.Item>
        <Dropdown.Item
          key="delete"
          withDivider
          color="error"
          icon={<FontAwesomeIcon icon={faTrash} />}
          description="Permanently delete collection"
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <TreeNode
      id={id}
      key={id}
      content={content}
      commandsContent={commandsContent}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
    >
      <Tree<GRPCService> data={data} nodeRenderer={grpcServiceNodeRenderer} />
    </TreeNode>
  );
};

export const collectionNodeRenderer: TreeNodeRenderer<Collection<CollectionType>> = (
  { id, name, type, children },
  { isOpen, onCollapseToggle }
) => (
  <CollectionNode
    id={id}
    key={id}
    name={name}
    type={type}
    data={children}
    isOpen={isOpen}
    onCollapseToggle={onCollapseToggle}
  />
);
