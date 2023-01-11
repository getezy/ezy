import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import { Setting as SettingView, TlsPreset as TlsPresetView } from '@core';

import { SubscriberFactory, subscribers } from './common';
import {
  Collection,
  createSettingMappings,
  createTlsPresetMappings,
  Environment,
  Setting,
  TlsPreset,
} from './entities';

function createMappings() {
  createSettingMappings();
  createTlsPresetMappings();
}

function createSubscribers(orm: MikroORM<SqliteDriver>) {
  SubscriberFactory.create<Setting, SettingView>(orm, Setting, SettingView);
  subscribers(orm, Environment);
  SubscriberFactory.create<TlsPreset, TlsPresetView>(orm, TlsPreset, TlsPresetView);
  subscribers(orm, Collection);
}

export function registerDatabaseSubscribers(orm: MikroORM<SqliteDriver>) {
  createMappings();
  createSubscribers(orm);
}
