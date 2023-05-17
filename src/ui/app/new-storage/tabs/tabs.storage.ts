/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { LocalAPI } from '@api';
import { TabsContainer } from '@core';

import { AppStorage } from '../app.interface';
import { TabsState, TabsStorageSlice } from './tabs.interface';

let container = new TabsContainer();

const initialState: TabsState = {
  tabs: [...container.getTabs()],
};

export const createTabsSlice: StateCreator<AppStorage, [], [], TabsStorageSlice> = (set) => ({
  ...initialState,

  fetchTabs: async () => {
    const tabs = await LocalAPI.tabs.fetch();

    container = new TabsContainer(tabs);

    set(
      produce<AppStorage>((state) => {
        state.tabs = [...container.getTabs()];
      })
    );
  },

  createTab: async (payload) => {
    container.createTab(payload);
    // const tab = container.create(payload);

    // await LocalAPI.tabs.upsert(tab);
    // const tabs = await LocalAPI.tabs.fetch();

    // container = new TabsContainer(tabs);
    set(
      produce<AppStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  updateTab: async (id, payload) => {
    container.updateTabs([id], payload);

    set(
      produce<AppStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  resetEnvironment: async (environmentId: string) => {
    container.resetEnvironment(environmentId);

    set(
      produce<AppStorage>((state) => {
        state.tabs = [...container.getTabs()];
      })
    );
  },

  moveTab: async (currentId, overId) => {
    container.moveTab(currentId, overId);

    set(
      produce<AppStorage>((state) => {
        state.tabs = [...container.getTabs()];
      })
    );
  },

  closeTab: async (id) => {
    container.closeTab(id);

    set(
      produce<AppStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  closeActiveTab: async () => {
    container.closeActiveTab();

    set(
      produce<AppStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  closeAllTabs: async () => {
    container.closeAllTabs();

    set(
      produce<AppStorage>((state) => {
        state.tabs = [...container.getTabs()];
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },

  activateTab: async (id) => {
    container.activateTab(id);

    set(
      produce<AppStorage>((state) => {
        state.activeTabId = container.getActiveTab()?.id;
      })
    );
  },
});
