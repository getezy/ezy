import { Environment } from '@database/types';

export function fetch() {
  return window.database.environment.find();
}

export function create(environment: Environment) {
  return window.database.environment.upsert(environment);
}

export function remove(id: string) {
  return window.database.environment.delete({ id });
}
