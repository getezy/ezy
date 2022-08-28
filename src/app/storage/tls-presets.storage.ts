/* eslint-disable no-param-reassign */

import { produce } from 'immer';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { GrpcTlsType } from '../../core/clients/grpc/interfaces';
import { TlsPresetsStorage } from './interfaces';

export const useTlsPresetsStore = create(
  persist<TlsPresetsStorage>(
    (set) => ({
      presets: [
        {
          id: nanoid(),
          name: 'Insecure',
          system: true,
          tls: { type: GrpcTlsType.INSECURE },
        },
        {
          id: nanoid(),
          name: 'Server-side',
          system: true,
          tls: { type: GrpcTlsType.SERVER_SIDE },
        },
      ],
      createTlsPreset: (preset) =>
        set(
          produce<TlsPresetsStorage>((state) => {
            state.presets.push({
              system: false,
              ...preset,
            });
          })
        ),
      updateTlsPreset: (id, preset) =>
        set(
          produce<TlsPresetsStorage>((state) => {
            const index = state.presets.findIndex((item) => item.id === id);

            if (index !== -1) {
              state.presets[index] = {
                ...state.presets[index],
                ...preset,
              };
            }
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
