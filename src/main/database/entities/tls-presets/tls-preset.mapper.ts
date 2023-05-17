import { constructUsing, createMap, forMember, mapFrom } from '@automapper/core';

import { TlsPreset as TlsPresetView } from '@core';

import { mapper } from '../../common';
import { TlsPreset } from './tls-preset.entity';

export function createTlsPresetMappings() {
  createMap(
    mapper,
    TlsPreset,
    TlsPresetView,
    forMember(
      (destination) => destination.tls,
      mapFrom((source) => source.tls)
    ),
    constructUsing((sourceObject) => new TlsPresetView(sourceObject))
  );
}
