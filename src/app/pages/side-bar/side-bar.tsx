import { Text } from '@nextui-org/react';
import React from 'react';

import { TreeFactory } from '../../components';
import { Collection, CollectionType, useCollectionsStore } from '../../storage';
import { collectionNodeRenderer } from './nodes';
import { StyledSideBar } from './side-bar.styled';

const CollectionTree = TreeFactory<Collection<CollectionType>>();

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
