import { preload } from './common';
import { Environment, Settings } from './entities';

export const Database = {
  settings: preload(Settings),
  environment: preload(Environment),
};
