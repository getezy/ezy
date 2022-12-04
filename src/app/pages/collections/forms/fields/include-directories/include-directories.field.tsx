import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Spacer, styled, Text } from '@nextui-org/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { MultiValue, SingleValue } from 'react-select';

import { EzyButton, Select, Tree } from '@components';
import { Collection, CollectionType, useCollectionsStore } from '@storage';

import { DirectoryNode, DirectoryNodeData } from './directory.node';

export interface CollectionFormProps {
  id?: string;

  defaultValues?: Partial<Collection<CollectionType>>;

  onSubmit: (payload: Collection<CollectionType>) => void;
}

type SelectCollectionOption = {
  label: string;
  value: string;
};

type IncludeDirectoriesContainerProps = {
  value?: string[];

  onChange: (value: string[]) => void;
};

const ListWrapper = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  margin: 0,

  height: 150,
  border: 'solid 1px $border',
  br: '$space$7',

  overflow: 'auto',
});

export const IncludeDirectoriesField = React.forwardRef<
  HTMLDivElement,
  IncludeDirectoriesContainerProps
>(({ onChange, value = [] }, ref) => {
  const collections = useCollectionsStore((store) =>
    store.collections.filter((collection) => collection.type === CollectionType.GRPC)
  ) as Collection<CollectionType.GRPC>[];
  const [directories, setDirectories] = React.useState<DirectoryNodeData[]>(
    value.map((item) => ({ id: nanoid(), value: item }))
  );
  const [isSelectCollectionShowing, setIsSelectCollectionShowing] = React.useState(false);
  const [selectedCollection, setSelectedCollection] = React.useState<SelectCollectionOption>();

  const handleAddDirectoryButtonClick = async () => {
    const paths = await window.electronDialog.open({ properties: ['openDirectory'] });
    const newDirectories = [
      ...directories,
      ...(paths || []).map((path) => ({
        id: nanoid(),
        value: path,
      })),
    ];

    setDirectories(newDirectories);
    onChange(newDirectories.map((directory) => directory.value));
  };

  const handleDirectoryRemove = (id: string) => {
    const newDirectories = directories.filter((item) => item.id !== id);

    setDirectories(newDirectories);
    onChange(newDirectories.map((directory) => directory.value));
  };

  const handleAddFromCollectionButtonClick = () => {
    setIsSelectCollectionShowing(true);
  };

  const handleCancelAddFromCollectionButtonClick = () => {
    setIsSelectCollectionShowing(false);
  };

  const handleSelectCollectionChange = (
    option: MultiValue<SelectCollectionOption> | SingleValue<SelectCollectionOption>
  ) => {
    const collection = option as SelectCollectionOption;
    setSelectedCollection(collection);
  };

  const handleAddFromSelectedCollectionButtonClick = () => {
    if (selectedCollection) {
      const collection = collections.find((item) => item.id === selectedCollection.value);
      if (collection) {
        const newDirectories = [
          ...directories,
          ...(collection.options.includeDirs || []).map((path) => ({
            id: nanoid(),
            value: path,
          })),
        ];

        setDirectories(newDirectories);
        onChange(newDirectories.map((directory) => directory.value));
      }
    }
    setIsSelectCollectionShowing(false);
  };

  return (
    <div ref={ref}>
      <Container gap={0} display="flex" alignItems="center">
        <Text weight="normal" size={14} css={{ userSelect: 'none', paddingLeft: 4 }}>
          Include directories (Optional)
        </Text>
        <Spacer x={0.5} />
        {!isSelectCollectionShowing && (
          <EzyButton
            size="xs"
            bordered
            borderWeight="light"
            icon={<FontAwesomeIcon size="sm" icon={faPlus} />}
            css={{ minWidth: 10, color: '$accents8', borderColor: '$accents3' }}
            onClick={handleAddDirectoryButtonClick}
          />
        )}
        {isSelectCollectionShowing ? (
          <Container
            gap={0}
            display="flex"
            alignContent="center"
            wrap="nowrap"
            responsive={false}
            css={{ flex: 1 }}
          >
            <Select
              size="xs"
              bordered
              borderWeight="light"
              options={collections.map((collection) => ({
                label: collection.name,
                value: collection.id,
              }))}
              value={selectedCollection}
              onChange={handleSelectCollectionChange}
              css={{
                flex: 1,
                '.react-select__menu-list': {
                  height: 100,
                },
              }}
            />
            <Spacer x={0.5} />
            <EzyButton
              size="xs"
              bordered
              borderWeight="light"
              icon={<FontAwesomeIcon size="sm" icon={faPlus} />}
              css={{ minWidth: 10, color: '$accents8', borderColor: '$accents3' }}
              onClick={handleAddFromSelectedCollectionButtonClick}
            />
            <Spacer x={0.2} />
            <Button
              size="xs"
              bordered
              borderWeight="light"
              color="error"
              icon={<FontAwesomeIcon size="sm" icon={faXmark} />}
              css={{ minWidth: 10 }}
              onClick={handleCancelAddFromCollectionButtonClick}
            />
          </Container>
        ) : (
          <EzyButton
            size="xs"
            bordered
            borderWeight="light"
            css={{ marginLeft: 'auto', minWidth: 10, color: '$accents8', borderColor: '$accents3' }}
            onClick={handleAddFromCollectionButtonClick}
          >
            Add from another collection
          </EzyButton>
        )}
      </Container>
      <Spacer y={0.3} />
      <ListWrapper>
        {directories.length ? (
          <Tree<DirectoryNodeData> data={directories}>
            {directories.map((item) => (
              <DirectoryNode
                id={item.id}
                key={item.id}
                data={item}
                onDirectoryRemove={handleDirectoryRemove}
              />
            ))}
          </Tree>
        ) : (
          <Container display="flex" justify="center" alignItems="center" css={{ flex: 1 }}>
            <Text css={{ color: '$accents6', userSelect: 'none' }}>No included directories</Text>
          </Container>
        )}
      </ListWrapper>
    </div>
  );
});
