import * as grpc from '@grpc/grpc-js';
import { join } from 'path';

import { ProtobufLoader } from '../../../protobuf';
import { GrpcClient } from '../grpc-client';
import { GrpcClientRequestOptions } from '../interfaces';

function createBasicService(error: any, response: any) {
  const BasicService = jest.fn(() => ({
    BasicRequest: jest.fn((_payload, _metadata, callback) => {
      callback(error, response);
    }),
  }));

  // @ts-ignore
  BasicService.serviceName = 'BasicService';

  return BasicService;
}

function createSimpleService(error: any, response: any) {
  const SimpleService = jest.fn(() => ({
    SimpleUnaryRequest: jest.fn((_payload, _metadata, callback) => {
      callback(error, response);
    }),
  }));

  // @ts-ignore
  SimpleService.serviceName = 'simple_package.v1.SimpleService';

  return SimpleService;
}

describe('GrpcClient', () => {
  it('should send unary request', async () => {
    const packageDefinition = await ProtobufLoader.loadFromFile({
      path: join(__dirname, '../../../__tests__/fixtures/proto/basic.proto'),
    });

    const requestOptions: GrpcClientRequestOptions = {
      serviceName: 'BasicService',
      methodName: 'BasicRequest',
      address: '127.0.0.1:3000',
    };

    const payload = {
      id: 'testid',
    };

    const BasicService = createBasicService(null, payload);

    jest.spyOn(grpc, 'loadPackageDefinition').mockImplementationOnce(() => ({
      // @ts-ignore
      BasicService,
    }));

    await expect(
      GrpcClient.sendUnaryRequest(packageDefinition, requestOptions, payload)
    ).resolves.toEqual(payload);
  });

  it('should send unary request width metadata', async () => {
    const packageDefinition = await ProtobufLoader.loadFromFile({
      path: join(__dirname, '../../../__tests__/fixtures/proto/basic.proto'),
    });

    const requestOptions: GrpcClientRequestOptions = {
      serviceName: 'BasicService',
      methodName: 'BasicRequest',
      address: '127.0.0.1:3000',
    };

    const payload = {
      id: 'testid',
    };

    const metadata = {
      'x-user-token': 'token',
    };

    const BasicService = createBasicService(null, payload);

    jest.spyOn(grpc, 'loadPackageDefinition').mockImplementationOnce(() => ({
      // @ts-ignore
      BasicService,
    }));

    await expect(
      GrpcClient.sendUnaryRequest(packageDefinition, requestOptions, payload, metadata)
    ).resolves.toEqual(payload);
  });

  it('should send unary request with error', async () => {
    const packageDefinition = await ProtobufLoader.loadFromFile({
      path: join(__dirname, '../../../__tests__/fixtures/proto/basic.proto'),
    });

    const requestOptions: GrpcClientRequestOptions = {
      serviceName: 'BasicService',
      methodName: 'BasicRequest',
      address: '127.0.0.1:3000',
    };

    const payload = {
      id: 'testid',
    };

    const error = { code: 14, details: 'No connection established' };

    const BasicService = createBasicService(error, null);

    jest.spyOn(grpc, 'loadPackageDefinition').mockImplementationOnce(() => ({
      // @ts-ignore
      BasicService,
    }));

    await expect(
      GrpcClient.sendUnaryRequest(packageDefinition, requestOptions, payload)
    ).resolves.toEqual(error);
  });

  it('should send unary request with package definition', async () => {
    const packageDefinition = await ProtobufLoader.loadFromFile({
      path: join(__dirname, '../../../__tests__/fixtures/proto/simple.proto'),
    });

    const requestOptions: GrpcClientRequestOptions = {
      serviceName: 'simple_package.v1.SimpleService',
      methodName: 'SimpleUnaryRequest',
      address: '127.0.0.1:3000',
    };

    const payload = {
      id: 'testid',
    };

    const SimpleService = createSimpleService(null, payload);

    jest.spyOn(grpc, 'loadPackageDefinition').mockImplementationOnce(() => ({
      // @ts-ignore
      'simple_package.v1.SimpleService': SimpleService,
    }));

    await expect(
      GrpcClient.sendUnaryRequest(packageDefinition, requestOptions, payload)
    ).resolves.toEqual(payload);
  });

  it('should throw error when no method definition exist', async () => {
    const packageDefinition = await ProtobufLoader.loadFromFile({
      path: join(__dirname, '../../../__tests__/fixtures/proto/simple.proto'),
    });

    const requestOptions: GrpcClientRequestOptions = {
      serviceName: 'simple_package.v1.SimpleService',
      methodName: 'SomeRequest',
      address: '127.0.0.1:3000',
    };

    await expect(
      GrpcClient.sendUnaryRequest(packageDefinition, requestOptions, {})
    ).rejects.toThrowError('No method definition');
  });
});
