import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import {
  Collection as CollectionView,
  Environment as EnvironmentView,
  Setting as SettingView,
  TlsPreset as TlsPresetView,
} from '@core';

import { SubscriberFactory } from './common';
import {
  Collection,
  createCollectionMappings,
  createEnvironmentMappings,
  createServiceMappings,
  createSettingMappings,
  createTlsPresetMappings,
  Environment,
  Setting,
  TlsPreset,
} from './entities';

function createMappings() {
  createSettingMappings();
  createEnvironmentMappings();
  createTlsPresetMappings();
  createServiceMappings();
  createCollectionMappings();
}

function createSubscribers(orm: MikroORM<SqliteDriver>) {
  SubscriberFactory.create<Setting, SettingView>(orm, Setting, SettingView);
  SubscriberFactory.create<Environment, EnvironmentView>(orm, Environment, EnvironmentView);
  SubscriberFactory.create<TlsPreset, TlsPresetView>(orm, TlsPreset, TlsPresetView);
  SubscriberFactory.create<Collection, CollectionView>(orm, Collection, CollectionView);
}

export function registerDatabaseSubscribers(orm: MikroORM<SqliteDriver>) {
  createMappings();
  createSubscribers(orm);
}
