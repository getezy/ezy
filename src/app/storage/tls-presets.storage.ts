import { produce } from 'immer';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { TlsPresetsStorage } from './interfaces';

export const useTlsPresetsStore = create(
  persist<TlsPresetsStorage>(
    (set) => ({
      presets: [],
      createTlsPreset: (preset) =>
        set(
          produce<TlsPresetsStorage>((state) => {
            state.presets.push(preset);
          })
        ),
      removeTlsPreset: (id) =>
        set(
          produce<TlsPresetsStorage>((state) => {
            const index = state.presets.findIndex((preset) => preset.id === id);
            if (index !== -1) state.presets.splice(index, 1);
          })
        ),
    }),
    {
      name: 'tls-presets',
      getStorage: () => window.electronStore,
    }
  )
);
