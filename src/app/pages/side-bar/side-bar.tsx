import { FormElement, Input, styled, Text } from '@nextui-org/react';
import React from 'react';

import { Tree } from '../../components';
import { Collection, CollectionType, useCollectionsStore } from '../../storage';
import { collectionNodeRenderer } from './nodes';
import { StyledSideBar } from './side-bar.styled';

const TreeWrapper = styled('div', {
  overflow: 'auto',
});

export const ExplorerSideBar = (): JSX.Element => {
  const filterCollections = useCollectionsStore((store) => store.filterCollection);

  const [filter, setFilter] = React.useState('');
  const [collections, setCollections] = React.useState(filterCollections(filter));

  useCollectionsStore.subscribe(() => {
    setCollections(filterCollections(filter));
  });

  React.useEffect(() => {
    setCollections(filterCollections(filter));
  }, [filter]);

  const handleSearchInputChange = (event: React.ChangeEvent<FormElement>) => {
    const search = event.target.value.toLowerCase();

    setFilter(search);
  };

  return (
    <StyledSideBar>
      <Input
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
        onChange={handleSearchInputChange}
      />
      <TreeWrapper>
        {collections.length ? (
          <Tree<Collection<CollectionType>>
            data={collections}
            nodeRenderer={collectionNodeRenderer}
          />
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
    </StyledSideBar>
  );
};
