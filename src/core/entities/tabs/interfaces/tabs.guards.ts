import { IAbstractTab, IGrpcRequestTab, TabType } from '@core';

export function isGrpcRequestTab(value?: IAbstractTab): value is IGrpcRequestTab {
  return value?.type === TabType.GrpcRequest;
}
