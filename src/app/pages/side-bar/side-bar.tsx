import { FormElement, Input, styled, Text } from '@nextui-org/react';
import React from 'react';

import { Tree } from '../../components';
import {
  Collection,
  CollectionChildren,
  CollectionType,
  GRPCMethod,
  useCollectionsStore,
} from '../../storage';
import { collectionNodeRenderer } from './nodes';
import { StyledSideBar } from './side-bar.styled';

const TreeWrapper = styled('div', {
  overflow: 'auto',
});

export const ExplorerSideBar = (): JSX.Element => {
  const collections = useCollectionsStore((store) => store.collections);

  const [filteredCollections, setFilteredCollections] = React.useState(collections);

  const handleSearchInputChange = (event: React.ChangeEvent<FormElement>) => {
    const search = event.target.value.toLowerCase();

    if (search.length > 0) {
      setFilteredCollections(
        collections.reduce((acc: Collection<CollectionType>[], collection) => {
          if (collection.type === CollectionType.GRPC) {
            const filteredServices = collection.children.reduce(
              (children: CollectionChildren<CollectionType.GRPC>, service) => {
                const filteredMethods = service.methods.reduce((methods: GRPCMethod[], method) => {
                  if (method.name.toLowerCase().includes(search)) {
                    methods.push(method);
                  }

                  return methods;
                }, []);

                if (filteredMethods.length || service.name.toLowerCase().includes(search)) {
                  children.push({
                    ...service,
                    methods: filteredMethods,
                  });
                }

                return children;
              },
              []
            );

            if (filteredServices.length || collection.name.toLowerCase().includes(search)) {
              acc.push({
                ...collection,
                children: filteredServices,
              });
            }
          }

          return acc;
        }, [])
      );
    } else {
      setFilteredCollections(collections);
    }
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
        {filteredCollections.length ? (
          <Tree<Collection<CollectionType>>
            data={filteredCollections}
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
