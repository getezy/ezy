import { Environment } from '@core';

export async function fetch() {
  const data = await window.database.environment.find({});

  const environments = data.map((item) => new Environment(item));

  return environments;
}

export function upsert(environment: Environment) {
  return window.database.environment.upsert(environment);
}

export function remove(id: string) {
  return window.database.environment.delete({ id });
}
