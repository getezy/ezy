import {
  faArrowsRotate,
  faEllipsis,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Spacer, styled, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

import { TreeFactory, TreeNode } from '../../components';
import {
  Collection,
  CollectionType,
  GRPCMethod,
  GRPCMethodType,
  GRPCService,
  useCollectionsStore,
} from '../../storage';
import { ProtoBadge, ServiceBadge, StreamBadge, UnaryBadge } from '../collections/badge-types';
import { StyledSideBar } from './side-bar.styled';

const StyledNodeWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  paddingLeft: 10,
  marginRight: 10,
  overflow: 'hidden',
  flex: 1,
});

const CollectionTree = TreeFactory<Collection<CollectionType>>();
const GRPCTree = TreeFactory<GRPCService>();
const GRPCMethodTree = TreeFactory<GRPCMethod>();

const grpcMethodNodeRenderer = ({ id, type, name }: GRPCMethod) => {
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

  return <TreeNode id={id} content={content} css={{ paddingLeft: 20 }} />;
};

const grpcNodeRenderer = ({ id, name, methods }: GRPCService) => {
  const content = (
    <StyledNodeWrapper>
      <ServiceBadge />
      <Spacer x={0.3} />
      <Text size={12}>{name}</Text>
    </StyledNodeWrapper>
  );

  return (
    <TreeNode id={id} content={content} css={{ paddingLeft: 10 }}>
      <GRPCMethodTree data={methods} nodeRenderer={grpcMethodNodeRenderer} />
    </TreeNode>
  );
};

const collectionNodeRenderer = ({ id, name, type, children }: Collection<CollectionType>) => {
  const content = (
    <StyledNodeWrapper>
      {type === CollectionType.GRPC && (
        <>
          <ProtoBadge />
          <Spacer x={0.3} />
        </>
      )}
      <Text size={12}>{name}</Text>
    </StyledNodeWrapper>
  );

  const commandsContent = (
    <Dropdown placement="right-top">
      <Dropdown.Button
        auto
        light
        color="gradient"
        size="xs"
        animated={false}
        css={{
          padding: 0,
          margin: 0,
          minWidth: 10,
          marginLeft: 'auto',
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
          description="Reload collection protobuf"
        >
          Synchronize collection
        </Dropdown.Item>
        <Dropdown.Item
          color="default"
          icon={<FontAwesomeIcon icon={faPenToSquare} />}
          description="Open collection settings"
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
    <TreeNode id={id} content={content} commandsContent={commandsContent}>
      <GRPCTree data={children} nodeRenderer={grpcNodeRenderer} />
    </TreeNode>
  );
};

export const ExplorerSideBar = (): JSX.Element => {
  const collections = useCollectionsStore((store) => store.collections);

  return (
    <StyledSideBar>
      {/* <Input
        bordered
        borderWeight="light"
        fullWidth
        animated={false}
        placeholder="Search..."
        clearable
        size="sm"
        css={{
          padding: 10,
        }}
      /> */}
      {collections.length ? (
        <CollectionTree data={collections} nodeRenderer={collectionNodeRenderer} />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: '100%',
            alignItems: 'center',
          }}
        >
          <Text css={{ color: '$accents6' }}>No collections</Text>
        </div>
      )}
    </StyledSideBar>
  );
};
