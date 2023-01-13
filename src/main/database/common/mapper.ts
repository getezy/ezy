import { createMapper } from '@automapper/core';
import { mikro } from '@automapper/mikro';

export const mapper = createMapper({
  strategyInitializer: mikro(),
});
