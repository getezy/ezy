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
import { Collection, CollectionType, GRPCService, useCollectionsStore } from '../../../storage';
import { ProtoBadge } from '../../collections/badge-types';
import { UpdateCollectionModal } from '../../collections/modals';
import { StyledNodeWrapper } from './node.styled';
import { grpcServiceNodeRenderer } from './service.node';

type CollectionNodeProps = {
  node: Collection<CollectionType>;

  isOpen?: boolean;
  onCollapseToggle?: (isOpen: boolean) => void;
};

const CollectionNode: React.FC<CollectionNodeProps> = ({ node, isOpen, onCollapseToggle }) => {
  const { removeCollection } = useCollectionsStore((store) => store);
  const [updateCollectionModalVisible, setUpdateCollectionModalVisible] = React.useState(false);

  const handleSelectionChange = (keys: 'all' | Set<string | number>) => {
    if (typeof keys !== 'string') {
      if (keys.has('delete')) {
        removeCollection(node.id);
      }

      if (keys.has('settings')) {
        setUpdateCollectionModalVisible(true);
      }
    }
  };

  const content = (
    <StyledNodeWrapper>
      {node.type === CollectionType.GRPC && (
        <>
          <ProtoBadge />
          <Spacer x={0.3} />
        </>
      )}
      <Tooltip content={node.name} color="invert" placement="topStart" enterDelay={1000}>
        <Text size={12}>{node.name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  const commandsContent = (
    <Dropdown placement="right-top" disableAnimation>
      <Dropdown.Button
        light
        size="xs"
        color="default"
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
    <>
      <TreeNode
        id={node.id}
        key={node.id}
        content={content}
        commandsContent={commandsContent}
        isOpen={isOpen}
        onCollapseToggle={onCollapseToggle}
      >
        <Tree<GRPCService> data={node.children} nodeRenderer={grpcServiceNodeRenderer} />
      </TreeNode>
      <UpdateCollectionModal
        closeButton
        blur
        defaultValues={node}
        open={updateCollectionModalVisible}
        onClose={() => setUpdateCollectionModalVisible(false)}
      />
    </>
  );
};

export const collectionNodeRenderer: TreeNodeRenderer<Collection<CollectionType>> = (
  data,
  { isOpen, onCollapseToggle }
) => (
  <CollectionNode key={data.id} node={data} isOpen={isOpen} onCollapseToggle={onCollapseToggle} />
);
