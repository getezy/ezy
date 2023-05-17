import { GrpcProtocolType, GrpcRequestTab, TabType } from '@core';

describe('GrpcRequestTab', () => {
  it('shoud update GrpcRequestTab', () => {
    const tab = new GrpcRequestTab({
      id: '1',
      active: true,
      order: 1,
      title: 'TestTab',
      type: TabType.GrpcRequest,
      protocol: GrpcProtocolType.Grpc,
      url: '10.10.10.10',
      environmentId: '1',
    });

    tab.update({});
  });
});
