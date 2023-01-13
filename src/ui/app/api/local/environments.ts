import { Environment } from '@core';

export function fetch() {
  return window.database.environment.find({});
}

export function upsert(environment: Environment) {
  return window.database.environment.upsert(environment);
}

export function remove(id: string) {
  return window.database.environment.delete({ id });
}
