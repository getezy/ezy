import { preload } from './common';
import { Environment, Setting } from './entities';

export const Database = {
  settings: preload(Setting),
  environment: preload(Environment),
};
