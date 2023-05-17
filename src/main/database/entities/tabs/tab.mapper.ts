import { addProfile, constructUsing, createMap, MappingProfile } from '@automapper/core';

import { GrpcRequestTab } from '@core';

import { mapper } from '../../common';
import { Tab } from './tab.entity';

export function createTabMappings() {
  const tabProfile: MappingProfile = (m) => {
    createMap(
      m,
      Tab,
      GrpcRequestTab,
      constructUsing(
        ({ data, ...base }) =>
          new GrpcRequestTab({
            ...base,
            ...data,
          })
      )
    );
  };

  addProfile(mapper, tabProfile);
}
