import {
  // faArrowRight,
  faArrowsRotate,
  // faSquarePlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createAction, KBarProvider } from 'kbar';
import React, { PropsWithChildren } from 'react';

import { KBar } from '../../components';
import { useCollectionsStore, useTabsStore } from '../../storage';
import { useGrpcMethodActions, useThemeActions } from './hooks';

const ActionsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  useGrpcMethodActions();
  useThemeActions();

  return <KBar>{children}</KBar>;
};

export const Shortcuts: React.FC<PropsWithChildren> = ({ children }) => {
  const { closeAllTabs, closeActiveTab } = useTabsStore((store) => store);
  const { collections, updateCollection } = useCollectionsStore((store) => store);

  const actions = [
    // createAction({
    //   name: 'Invoke/Send',
    //   icon: <FontAwesomeIcon icon={faArrowRight} />,
    //   shortcut: ['$mod+Enter'],
    //   perform: () => window.open('https://google.com', '_blank'),
    // }),
    // createAction({
    //   section: 'Collections',
    //   name: 'New Collection',
    //   icon: <FontAwesomeIcon icon={faSquarePlus} />,
    //   shortcut: ['$mod+Shift+C'],
    //   perform: () => window.open('https://google.com', '_blank'),
    // }),
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
      <ActionsProvider>{children}</ActionsProvider>
    </KBarProvider>
  );
};
