import React from 'react';
import { useEffectOnce } from 'react-use';

import { useAppContextProvider } from '@context';
import { useUpdateCollection } from '@hooks';
import { DefaultLayout } from '@layouts';
import { useCollectionsStore } from '@storage';

import { Shortcuts } from './shortcuts';
import { SideBar } from './side-bar';
import { StatusBar } from './status-bar';
// import { TabsContainer } from './tabs';
import { TabsContainer } from './tabs-container';

export const Main = (): JSX.Element => {
  const { collections } = useCollectionsStore((store) => store);
  const { appContext, AppProvider } = useAppContextProvider();
  const { update: updateCollection } = useUpdateCollection();

  useEffectOnce(() => {
    // Hack for loading toast styles first
    // https://github.com/getezy/ezy/issues/36
    setTimeout(() => {
      collections.forEach((collection) => {
        updateCollection(collection.id, collection, { hideSuccessNotification: true });
      });
    }, 1);
  });

  return (
    <AppProvider value={appContext}>
      <Shortcuts>
        <DefaultLayout left={<SideBar />} bottom={<StatusBar />}>
          <TabsContainer />
        </DefaultLayout>
      </Shortcuts>
    </AppProvider>
  );
};
