import { faArrowsRotate, faSquarePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createAction, KBarProvider } from 'kbar';
import React, { PropsWithChildren } from 'react';

import { KBar } from '@components';
import { AppContext } from '@context';
import { useCollectionsStore, useTabsStore } from '@storage';

import { useEnvironmentActions, useGrpcMethodActions, useThemeActions } from './hooks';

interface ActionsProviderProps {
  os: string;
}

const ActionsProvider: React.FC<PropsWithChildren<ActionsProviderProps>> = ({ children, os }) => {
  useGrpcMethodActions();
  useEnvironmentActions();
  useThemeActions();

  return <KBar os={os}>{children}</KBar>;
};

export const Shortcuts: React.FC<PropsWithChildren> = ({ children }) => {
  const context = React.useContext(AppContext);

  const { closeAllTabs, closeActiveTab } = useTabsStore((store) => store);
  const { collections, updateCollection } = useCollectionsStore((store) => store);

  const actions = [
    createAction({
      section: 'Collections',
      name: 'New Collection',
      icon: <FontAwesomeIcon icon={faSquarePlus} />,
      shortcut: ['$mod+Shift+C'],
      perform: () => context?.modal.setCreateCollectionModalVisible(true),
    }),
    createAction({
      section: 'Collections',
      name: 'Synchronize All',
      icon: <FontAwesomeIcon icon={faArrowsRotate} />,
      shortcut: ['$mod+Shift+S'],
      perform: () => {
        collections.forEach((collection) => {
          updateCollection(collection.id, collection, true);
        });
      },
    }),
    createAction({
      section: 'Tabs',
      name: 'Close Active Tab',
      icon: <FontAwesomeIcon icon={faXmark} />,
      shortcut: ['$mod+W'],
      perform: () => closeActiveTab(),
    }),
    createAction({
      section: 'Tabs',
      name: 'Close All Tabs',
      icon: <FontAwesomeIcon icon={faXmark} />,
      shortcut: ['$mod+Shift+W'],
      perform: () => closeAllTabs(),
    }),
  ];

  return (
    <KBarProvider actions={actions}>
      <ActionsProvider os={context?.platform.os || 'darwin'}>{children}</ActionsProvider>
    </KBarProvider>
  );
};
