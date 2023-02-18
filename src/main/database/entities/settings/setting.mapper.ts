import { constructUsing, createMap, forMember, mapFrom } from '@automapper/core';

import { Setting as SettingView, SettingKey } from '@core';

import { mapper } from '../../common';
import { Setting } from './setting.entity';
import {
  isAlignmentSetting,
  isLanguageSetting,
  isMenuOptionsSetting,
  isThemeSetting,
} from './settings.guards';

function getValue(source: Setting<SettingKey>) {
  if (isAlignmentSetting(source)) {
    return source.value.alignment;
  }
  if (isLanguageSetting(source)) {
    return source.value.language;
  }
  if (isMenuOptionsSetting(source)) {
    return source.value;
  }
  if (isThemeSetting(source)) {
    return source.value.theme;
  }

  throw new Error('Error while mapping setting value');
}

export function createSettingMappings() {
  createMap(
    mapper,
    Setting,
    SettingView,
    forMember(
      (destination) => destination.value,
      mapFrom((source) => getValue(source))
    ),
    constructUsing(
      (sourceObject) => new SettingView({ key: sourceObject.key, value: getValue(sourceObject) })
    )
  );
}
