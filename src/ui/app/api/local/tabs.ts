import { SetOptional } from 'type-fest';

import { IAbstractTab } from '@core';

export function fetch() {
  return window.database.tabs.find({});
}

export function upsert(tab: SetOptional<IAbstractTab, 'id'>) {
  return window.database.tabs.upsert(tab);
}

export function remove(id: string) {
  return window.database.tabs.delete({ id });
}
