import React from 'react';

import { Explorer } from '../components';
import { Header } from './header';
import { ExplorerSideBar } from './side-bar';
import { TabsContainer } from './tabs-container';

export const Main = (): JSX.Element => (
  <Explorer header={<Header />} sideBar={<ExplorerSideBar />}>
    <TabsContainer />
  </Explorer>
);
