// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_basic_pb = require('../proto/basic_pb.js');

function serialize_BasicMessage(arg) {
  if (!(arg instanceof proto_basic_pb.BasicMessage)) {
    throw new Error('Expected argument of type BasicMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BasicMessage(buffer_arg) {
  return proto_basic_pb.BasicMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var BasicServiceService = exports.BasicServiceService = {
  basicRequest: {
    path: '/BasicService/BasicRequest',
    requestStream: false,
    responseStream: false,
    requestType: proto_basic_pb.BasicMessage,
    responseType: proto_basic_pb.BasicMessage,
    requestSerialize: serialize_BasicMessage,
    requestDeserialize: deserialize_BasicMessage,
    responseSerialize: serialize_BasicMessage,
    responseDeserialize: deserialize_BasicMessage,
  },
};

exports.BasicServiceClient = grpc.makeGenericClientConstructor(BasicServiceService);
