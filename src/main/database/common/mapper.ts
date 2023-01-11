import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';

export const mapper = createMapper({
  strategyInitializer: classes(),
});
