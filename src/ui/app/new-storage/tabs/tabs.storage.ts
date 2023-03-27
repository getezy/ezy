/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { create } from 'zustand';

import { LocalAPI } from '@api';
import { TabsContainer } from '@core';

import { TabsState, TabsStorage } from './tabs.interface';

let container = new TabsContainer();

const initialState: TabsState = {
  tabs: [...container.getTabs()],
};

export const useTabsStore = create<TabsStorage>((set) => ({
  ...initialState,

  fetch: async () => {
    const tabs = await LocalAPI.tabs.fetch();

    container = new TabsContainer(tabs);

    set(
      produce<TabsStorage>((state) => {
        state.tabs = [...container.getTabs()];
      })
    );
  },

  create: async (payload) => {
    container.create(payload);
    // const tab = container.create(payload);

    // await LocalAPI.tabs.upsert(tab);
    // const tabs = await LocalAPI.tabs.fetch();

    // container = new TabsContainer(tabs);
    set(
      produce<TabsStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  moveTab: (currentId, overId) => {
    container.moveTab(currentId, overId);

    set(
      produce<TabsStorage>((state) => {
        state.tabs = [...container.getTabs()];
      })
    );
  },

  closeTab: (id) => {
    container.closeTab(id);

    set(
      produce<TabsStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  closeActiveTab: () => {
    container.closeActiveTab();

    set(
      produce<TabsStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  closeAllTabs: () => {
    container.closeAllTabs();

    set(
      produce<TabsStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  activateTab: (id) => {
    container.activateTab(id);

    set(
      produce<TabsStorage>((state) => {
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },
}));
