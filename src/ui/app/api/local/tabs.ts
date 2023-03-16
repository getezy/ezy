import { SetOptional } from 'type-fest';

import { AbstractTab, IAbstractTab } from '@core';

export async function fetch() {
  const data = await window.database.tabs.find({});

  const tabs = data.map((item) => new AbstractTab(item));

  return tabs;
}

export function upsert(tab: SetOptional<IAbstractTab, 'id'>) {
  return window.database.tabs.upsert(tab);
}

export function remove(id: string) {
  return window.database.tabs.delete({ id });
}
