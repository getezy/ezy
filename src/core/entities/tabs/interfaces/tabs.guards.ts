import { AbstractTab, GrpcRequestTab, TabType } from '@core';

export function isGrpcRequestTab(value: AbstractTab): value is GrpcRequestTab {
  return value.type === TabType.GrpcRequest;
}
