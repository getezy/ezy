import { produce } from 'immer';
import { nanoid } from 'nanoid';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import { GrpcTlsType } from '../../core/clients/grpc-client/interfaces/grpc-client.interface';
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
              id: nanoid(),
              system: false,
              ...preset,
            });
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
