import { createMap } from '@automapper/core';

import { Collection as CollectionView } from '@core';

import { mapper } from '../../common';
import { Collection } from './collection.entity';

export function createCollectionMappings() {
  createMap(mapper, Collection, CollectionView);
}
