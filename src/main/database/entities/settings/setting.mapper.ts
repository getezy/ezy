import { createMap, forMember, mapFrom } from '@automapper/core';

import { Setting as SettingView } from '@core';

import { mapper } from '../../common';
import { Setting } from './setting.entity';

export function createSettingMappings() {
  createMap(
    mapper,
    Setting,
    SettingView,
    forMember(
      (destination) => destination.value,
      mapFrom((source) => source.value)
    )
  );
}
