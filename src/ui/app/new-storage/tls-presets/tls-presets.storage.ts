/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { create } from 'zustand';

import { LocalAPI } from '@api';

import { TlsPresetsStorage } from './tls-presets.interface';

export const useTlsPresetsStore = create<TlsPresetsStorage>((set) => ({
  presets: [],

  fetch: async () => {
    const data = await LocalAPI.tlsPresets.fetch();

    set(
      produce<TlsPresetsStorage>((state) => {
        state.presets = data;
      })
    );
  },

  upsertTlsPreset: async (preset) => {
    await LocalAPI.tlsPresets.upsert(preset);
    const data = await LocalAPI.tlsPresets.fetch();

    set(
      produce<TlsPresetsStorage>((state) => {
        state.presets = data;
      })
    );
  },

  removeTlsPreset: async (id) => {
    await LocalAPI.tlsPresets.remove(id);
    const data = await LocalAPI.tlsPresets.fetch();

    set(
      produce<TlsPresetsStorage>((state) => {
        state.presets = data;
      })
    );
  },
}));
