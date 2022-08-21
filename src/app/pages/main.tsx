import React from 'react';
import { useEffectOnce } from 'react-use';

import { NotificationContainer } from '../components';
import { useCollectionsStore } from '../storage';
import { useAppContextProvider } from './context';
import { Explorer } from './explorer';
import { Header } from './header';
import { Shortcuts } from './shortcuts';
import { ExplorerSideBar } from './side-bar';
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
        <NotificationContainer />
        <Explorer header={<Header />} sideBar={<ExplorerSideBar />}>
          <TabsContainer />
        </Explorer>
      </Shortcuts>
    </AppProvider>
  );
};
