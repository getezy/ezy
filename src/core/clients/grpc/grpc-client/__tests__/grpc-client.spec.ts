import * as grpc from '@grpc/grpc-js';
// import { ClientReadableStreamImpl } from '@grpc/grpc-js/build/src/call';
import { join } from 'path';

import { ProtobufLoader } from '../../../../protobuf';
import { GrpcClientRequestOptions, GrpcStatus, GrpcTlsType } from '../../interfaces';
import { GrpcClient } from '../grpc-client';

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
    // SimpleServerStreamRequest: jest.fn(() => new ClientReadableStreamImpl(jest.fn())),
  }));

  // @ts-ignore
  SimpleService.serviceName = 'simple_package.v1.SimpleService';

  return SimpleService;
}

describe('GrpcClient', () => {
  describe('GrpcClient::InvokeUnaryRequest', () => {
    it('should invoke unary request', async () => {
      const packageDefinition = await ProtobufLoader.loadFromFile({
        path: join(__dirname, '../../../../__tests__/fixtures/proto/basic.proto'),
      });

      const requestOptions: GrpcClientRequestOptions = {
        serviceName: 'BasicService',
        methodName: 'BasicRequest',
        address: '127.0.0.1:3000',
        tls: { type: GrpcTlsType.INSECURE },
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
        GrpcClient.invokeUnaryRequest(packageDefinition, requestOptions, payload)
      ).resolves.toEqual({
        code: GrpcStatus.OK,
        timestamp: 0,
        value: payload,
      });
    });

    it('should invoke unary request width metadata', async () => {
      const packageDefinition = await ProtobufLoader.loadFromFile({
        path: join(__dirname, '../../../../__tests__/fixtures/proto/basic.proto'),
      });

      const requestOptions: GrpcClientRequestOptions = {
        serviceName: 'BasicService',
        methodName: 'BasicRequest',
        address: '127.0.0.1:3000',
        tls: { type: GrpcTlsType.INSECURE },
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
        GrpcClient.invokeUnaryRequest(packageDefinition, requestOptions, payload, metadata)
      ).resolves.toEqual({
        code: GrpcStatus.OK,
        timestamp: 0,
        value: payload,
      });
    });

    it('should invoke unary request with error', async () => {
      const packageDefinition = await ProtobufLoader.loadFromFile({
        path: join(__dirname, '../../../../__tests__/fixtures/proto/basic.proto'),
      });

      const requestOptions: GrpcClientRequestOptions = {
        serviceName: 'BasicService',
        methodName: 'BasicRequest',
        address: '127.0.0.1:3000',
        tls: { type: GrpcTlsType.INSECURE },
      };

      const payload = {
        id: 'testid',
      };

      const error = { code: GrpcStatus.UNAVAILABLE, details: 'No connection established' };

      const BasicService = createBasicService(error, null);

      jest.spyOn(grpc, 'loadPackageDefinition').mockImplementationOnce(() => ({
        // @ts-ignore
        BasicService,
      }));

      await expect(
        GrpcClient.invokeUnaryRequest(packageDefinition, requestOptions, payload)
      ).resolves.toEqual({
        code: GrpcStatus.UNAVAILABLE,
        timestamp: 0,
        value: error,
      });
    });

    it('should invoke unary request with package definition', async () => {
      const packageDefinition = await ProtobufLoader.loadFromFile({
        path: join(__dirname, '../../../../__tests__/fixtures/proto/simple.proto'),
      });

      const requestOptions: GrpcClientRequestOptions = {
        serviceName: 'simple_package.v1.SimpleService',
        methodName: 'SimpleUnaryRequest',
        address: '127.0.0.1:3000',
        tls: { type: GrpcTlsType.INSECURE },
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
        GrpcClient.invokeUnaryRequest(packageDefinition, requestOptions, payload)
      ).resolves.toEqual({
        code: GrpcStatus.OK,
        timestamp: 0,
        value: payload,
      });
    });

    it('should throw error when no service definition exist', async () => {
      const packageDefinition = await ProtobufLoader.loadFromFile({
        path: join(__dirname, '../../../../__tests__/fixtures/proto/simple.proto'),
      });

      const requestOptions: GrpcClientRequestOptions = {
        serviceName: 'SomeService',
        methodName: 'SomeRequest',
        address: '127.0.0.1:3000',
        tls: { type: GrpcTlsType.INSECURE },
      };

      await expect(
        GrpcClient.invokeUnaryRequest(packageDefinition, requestOptions, {})
      ).rejects.toThrowError('No service definition');
    });

    it('should throw error when no method definition exist', async () => {
      const packageDefinition = await ProtobufLoader.loadFromFile({
        path: join(__dirname, '../../../../__tests__/fixtures/proto/simple.proto'),
      });

      const requestOptions: GrpcClientRequestOptions = {
        serviceName: 'simple_package.v1.SimpleService',
        methodName: 'SomeRequest',
        address: '127.0.0.1:3000',
        tls: { type: GrpcTlsType.INSECURE },
      };

      await expect(
        GrpcClient.invokeUnaryRequest(packageDefinition, requestOptions, {})
      ).rejects.toThrowError('No method definition');
    });
  });

  // describe('GrpcClient::InvokeServerStreamingRequest', () => {
  //   it('should invoke server streaming request', async () => {
  //     const packageDefinition = await ProtobufLoader.loadFromFile({
  //       path: join(__dirname, '../../../__tests__/fixtures/proto/simple.proto'),
  //     });

  //     const requestOptions: GrpcClientRequestOptions = {
  //       serviceName: 'simple_package.v1.SimpleService',
  //       methodName: 'SimpleServerStreamRequest',
  //       address: '127.0.0.1:3000',
  //     };

  //     const call = GrpcClient.invokeServerStreamingRequest(packageDefinition, requestOptions, {});

  //     expect(call instanceof ClientReadableStreamImpl).toBe(true);
  //   });
  // });
});
