import { FormElement, Input, styled, Text } from '@nextui-org/react';
import React from 'react';

import { Tree } from '@components';
import { Collection, CollectionType, useCollectionsStore } from '@storage';

import { StyledCollectionsTree } from './collections-tree.styled';
import { CollectionNode } from './nodes';

const TreeWrapper = styled('div', {
  overflow: 'auto',
});

export const CollectionsTree = (): JSX.Element => {
  const [filter, setFilter] = React.useState('');

  const collections = useCollectionsStore((store) => store.filterCollections(filter));

  const handleSearchInputChange = (event: React.ChangeEvent<FormElement>) => {
    const search = event.target.value.toLowerCase();

    setFilter(search);
  };

  return (
    <StyledCollectionsTree>
      <Input
        aria-label="collection-search-input"
        bordered
        borderWeight="light"
        fullWidth
        placeholder="Find collection, service or method"
        clearable
        size="sm"
        css={{
          padding: 10,
        }}
        onChange={handleSearchInputChange}
      />
      <TreeWrapper>
        {collections.length ? (
          <Tree<Collection<CollectionType>> data={collections}>
            {collections.map((collection) => (
              <CollectionNode id={collection.id} key={collection.id} data={collection} />
            ))}
          </Tree>
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
      </TreeWrapper>
    </StyledCollectionsTree>
  );
};
