import { Input, Text } from '@nextui-org/react';
import React from 'react';

import { useCollectionsStore } from '../storage';

export const ExplorerSideBar = (): JSX.Element => {
  const collections = useCollectionsStore((store) => store.collections);

  return (
    <>
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
      />
      {collections.length > 0 ? (
        test
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Text css={{ color: '$accents6' }}>No items</Text>
        </div>
      )}
    </>
  );
};
