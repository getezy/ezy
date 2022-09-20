import { Tree, TreeNode, TreeNodeRendererProps } from '@components';
import {
  faArrowsRotate,
  faEllipsis,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Spacer, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { Collection, CollectionType, GrpcService, useCollectionsStore } from '../../../storage';
import { ProtoBadge } from '../../collections/badge-types';
import { UpdateCollectionModal } from '../../collections/modals';
import { StyledNodeWrapper } from './node.styled';
import { GrpcServiceNode } from './service.node';

export const CollectionNode: React.FC<TreeNodeRendererProps<Collection<CollectionType>>> = ({
  data,
  isOpen,
  onCollapseToggle,
}) => {
  const { removeCollection, updateCollection } = useCollectionsStore((store) => store);
  const [updateCollectionModalVisible, setUpdateCollectionModalVisible] = React.useState(false);

  const handleSelectionChange = async (keys: 'all' | Set<string | number>) => {
    if (typeof keys !== 'string') {
      if (keys.has('delete')) {
        removeCollection(data.id);
      }

      if (keys.has('settings')) {
        setUpdateCollectionModalVisible(true);
      }

      if (keys.has('synchronize')) {
        await updateCollection(data.id, data);
      }
    }
  };

  const content = (
    <StyledNodeWrapper>
      {data.type === CollectionType.GRPC && (
        <>
          <ProtoBadge />
          <Spacer x={0.3} />
        </>
      )}
      <Tooltip content={data.name} placement="topStart" enterDelay={500}>
        <Text size={12}>{data.name}</Text>
      </Tooltip>
    </StyledNodeWrapper>
  );

  const commandsContent = (
    <Dropdown placement="right-top" disableAnimation>
      <Dropdown.Button
        light
        size="xs"
        color="warning"
        css={{
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
        id={data.id}
        key={data.id}
        content={content}
        commandsContent={commandsContent}
        isOpen={isOpen}
        onCollapseToggle={onCollapseToggle}
        defaultPadding
      >
        <Tree<GrpcService> data={data.children}>
          {data.children?.map((service) => (
            <GrpcServiceNode id={service.id} key={service.id} data={service} />
          ))}
        </Tree>
      </TreeNode>
      <UpdateCollectionModal
        fullScreen
        closeButton
        blur
        defaultValues={data}
        open={updateCollectionModalVisible}
        onClose={() => setUpdateCollectionModalVisible(false)}
      />
    </>
  );
};
