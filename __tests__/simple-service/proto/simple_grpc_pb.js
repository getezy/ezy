// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_simple_pb = require('../proto/simple_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_simple_package_v1_SimpleMessage(arg) {
  if (!(arg instanceof proto_simple_pb.SimpleMessage)) {
    throw new Error('Expected argument of type simple_package.v1.SimpleMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_simple_package_v1_SimpleMessage(buffer_arg) {
  return proto_simple_pb.SimpleMessage.deserializeBinary(new Uint8Array(buffer_arg));
}


var SimpleServiceService = exports.SimpleServiceService = {
  simpleUnaryRequest: {
    path: '/simple_package.v1.SimpleService/SimpleUnaryRequest',
    requestStream: false,
    responseStream: false,
    requestType: proto_simple_pb.SimpleMessage,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_simple_package_v1_SimpleMessage,
    requestDeserialize: deserialize_simple_package_v1_SimpleMessage,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  simpleClientStreamRequest: {
    path: '/simple_package.v1.SimpleService/SimpleClientStreamRequest',
    requestStream: true,
    responseStream: false,
    requestType: proto_simple_pb.SimpleMessage,
    responseType: proto_simple_pb.SimpleMessage,
    requestSerialize: serialize_simple_package_v1_SimpleMessage,
    requestDeserialize: deserialize_simple_package_v1_SimpleMessage,
    responseSerialize: serialize_simple_package_v1_SimpleMessage,
    responseDeserialize: deserialize_simple_package_v1_SimpleMessage,
  },
  simpleServerStreamRequest: {
    path: '/simple_package.v1.SimpleService/SimpleServerStreamRequest',
    requestStream: false,
    responseStream: true,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: proto_simple_pb.SimpleMessage,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_simple_package_v1_SimpleMessage,
    responseDeserialize: deserialize_simple_package_v1_SimpleMessage,
  },
  simpleBidirectionalStreamRequest: {
    path: '/simple_package.v1.SimpleService/SimpleBidirectionalStreamRequest',
    requestStream: true,
    responseStream: true,
    requestType: proto_simple_pb.SimpleMessage,
    responseType: proto_simple_pb.SimpleMessage,
    requestSerialize: serialize_simple_package_v1_SimpleMessage,
    requestDeserialize: deserialize_simple_package_v1_SimpleMessage,
    responseSerialize: serialize_simple_package_v1_SimpleMessage,
    responseDeserialize: deserialize_simple_package_v1_SimpleMessage,
  },
};

exports.SimpleServiceClient = grpc.makeGenericClientConstructor(SimpleServiceService);
