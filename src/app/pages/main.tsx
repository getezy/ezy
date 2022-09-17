import React from 'react';
import { useEffectOnce } from 'react-use';

import { DefaultLayout } from '../layouts';
import { useCollectionsStore } from '../storage';
import { useAppContextProvider } from './context';
import { Shortcuts } from './shortcuts';
import { SideBar } from './side-bar';
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
        <DefaultLayout left={<SideBar />} bottom={<StatusBar />}>
          <TabsContainer />
        </DefaultLayout>
      </Shortcuts>
    </AppProvider>
  );
};
