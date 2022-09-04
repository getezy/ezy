import { Container } from '@nextui-org/react';
import React from 'react';
import { useEffectOnce } from 'react-use';

import { useCollectionsStore } from '../storage';
import { useAppContextProvider } from './context';
import { Explorer } from './explorer';
import { Header } from './header';
import { Shortcuts } from './shortcuts';
import { ExplorerSideBar } from './side-bar';
import { StatusBar } from './status-bar';
import { TabsContainer } from './tabs-container';

export const Main = (): JSX.Element => {
  const { collections, updateCollection } = useCollectionsStore((store) => store);
  const { value, AppProvider } = useAppContextProvider();

  useEffectOnce(() => {
    collections.forEach((collection) => {
      updateCollection(collection.id, collection, false);
    });
  });

  return (
    <AppProvider value={value}>
      <Shortcuts>
        <Container
          gap={0}
          responsive={false}
          display="flex"
          direction="column"
          css={{ height: '100%', overflow: 'hidden' }}
        >
          <Explorer header={<Header />} sideBar={<ExplorerSideBar />}>
            <TabsContainer />
          </Explorer>
          <StatusBar />
        </Container>
      </Shortcuts>
    </AppProvider>
  );
};
