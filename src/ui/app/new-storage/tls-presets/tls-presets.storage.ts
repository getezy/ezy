/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { StateCreator } from 'zustand';

import { LocalAPI } from '@api';

import { AppStorage } from '../app.interface';
import { TlsPresetsStorageSlice } from './tls-presets.interface';

export const createTlsPresetsSlice: StateCreator<AppStorage, [], [], TlsPresetsStorageSlice> = (
  set
) => ({
  tlsPresets: [],

  fetchTlsPresets: async () => {
    const data = await LocalAPI.tlsPresets.fetch();

    set(
      produce<AppStorage>((state) => {
        state.tlsPresets = data;
      })
    );
  },

  upsertTlsPreset: async (preset) => {
    await LocalAPI.tlsPresets.upsert(preset);
    const data = await LocalAPI.tlsPresets.fetch();

    set(
      produce<AppStorage>((state) => {
        state.tlsPresets = data;
      })
    );
  },

  removeTlsPreset: async (id) => {
    await LocalAPI.tlsPresets.remove(id);
    const data = await LocalAPI.tlsPresets.fetch();

    set(
      produce<AppStorage>((state) => {
        state.tlsPresets = data;
      })
    );
  },
});
