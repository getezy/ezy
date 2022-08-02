import React from 'react';
import { useEffectOnce } from 'react-use';

import { useCollectionsStore } from '../storage';
import { Explorer } from './explorer';
import { Header } from './header';
import { ExplorerSideBar } from './side-bar';
import { TabsContainer } from './tabs-container';

export const Main = (): JSX.Element => {
  const { collections, updateCollection } = useCollectionsStore((store) => store);

  useEffectOnce(() => {
    collections.forEach((collection) => {
      updateCollection(collection.id, collection);
    });
  });

  return (
    <Explorer header={<Header />} sideBar={<ExplorerSideBar />}>
      <TabsContainer />
    </Explorer>
  );
};
