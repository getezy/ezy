import { MikroORM } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';

import {
  AbstractTab as TabView,
  Environment as EnvironmentView,
  Setting as SettingView,
  TlsPreset as TlsPresetView,
} from '@core';

import { SubscriberFactory } from './common';
import {
  createEnvironmentMappings,
  createSettingMappings,
  createTabMappings,
  createTlsPresetMappings,
  Environment,
  Setting,
  Tab,
  TlsPreset,
} from './entities';

function createMappings() {
  createSettingMappings();
  createEnvironmentMappings();
  createTlsPresetMappings();
  createTabMappings();
}

function createSubscribers(orm: MikroORM<SqliteDriver>) {
  SubscriberFactory.create<Setting, SettingView>(orm, Setting, SettingView);
  SubscriberFactory.create<Environment, EnvironmentView>(orm, Environment, EnvironmentView);
  SubscriberFactory.create<TlsPreset, TlsPresetView>(orm, TlsPreset, TlsPresetView);
  SubscriberFactory.create<Tab, TabView>(orm, Tab, TabView);
}

export function registerDatabaseSubscribers(orm: MikroORM<SqliteDriver>) {
  createMappings();
  createSubscribers(orm);
}
