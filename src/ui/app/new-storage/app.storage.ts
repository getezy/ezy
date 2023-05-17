import { create, StateCreator } from 'zustand';

import { AppStorage, AppStorageSlice } from './app.interface';
import { createEnvironmentsSlice } from './environments';
import { createSettingsSlice } from './settings';
import { createTabsSlice } from './tabs';
import { createTlsPresetsSlice } from './tls-presets';

export const createAppStorageSlice: StateCreator<AppStorage, [], [], AppStorageSlice> = (
  ...args
) => ({
  fetch: async () => {
    await Promise.all([
      createEnvironmentsSlice(...args).fetchEnvironments(),
      createTabsSlice(...args).fetchTabs(),
      createSettingsSlice(...args).fetchSettings(),
      createTlsPresetsSlice(...args).fetchTlsPresets(),
    ]);
  },

  removeEnvironmentAndResetTabs: async (id: string) => {
    await createEnvironmentsSlice(...args).removeEnvironment(id);
    await createTabsSlice(...args).resetEnvironment(id);
  },
});

export const useAppStorage = create<AppStorage>()((...args) => ({
  ...createAppStorageSlice(...args),
  ...createEnvironmentsSlice(...args),
  ...createTabsSlice(...args),
  ...createSettingsSlice(...args),
  ...createTlsPresetsSlice(...args),
}));
