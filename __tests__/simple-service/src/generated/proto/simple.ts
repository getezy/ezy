/* eslint-disable */
import {
  UntypedServiceImplementation,
  handleUnaryCall,
  handleClientStreamingCall,
  handleServerStreamingCall,
  handleBidiStreamingCall,
} from "@grpc/grpc-js";
import { Empty } from "../google/protobuf/empty";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "simple_package.v1";

export interface SimpleMessage {
  id: string;
}

function createBaseSimpleMessage(): SimpleMessage {
  return { id: "" };
}

export const SimpleMessage = {
  encode(
    message: SimpleMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleMessage {
    return {
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: SimpleMessage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleMessage>, I>>(
    object: I
  ): SimpleMessage {
    const message = createBaseSimpleMessage();
    message.id = object.id ?? "";
    return message;
  },
};

export type SimpleServiceService = typeof SimpleServiceService;
export const SimpleServiceService = {
  unary: {
    path: "/simple_package.v1.SimpleService/Unary",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SimpleMessage.decode(value),
    responseSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SimpleMessage.decode(value),
  },
  unaryWithError: {
    path: "/simple_package.v1.SimpleService/UnaryWithError",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SimpleMessage.decode(value),
    responseSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SimpleMessage.decode(value),
  },
  clientStreamingRequest: {
    path: "/simple_package.v1.SimpleService/ClientStreamingRequest",
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SimpleMessage.decode(value),
    responseSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SimpleMessage.decode(value),
  },
  clientStreamingRequestWithError: {
    path: "/simple_package.v1.SimpleService/ClientStreamingRequestWithError",
    requestStream: true,
    responseStream: false,
    requestSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SimpleMessage.decode(value),
    responseSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SimpleMessage.decode(value),
  },
  serverStreamingRequest: {
    path: "/simple_package.v1.SimpleService/ServerStreamingRequest",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: Empty) =>
      Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SimpleMessage.decode(value),
  },
  bidirectionalStreamingRequest: {
    path: "/simple_package.v1.SimpleService/BidirectionalStreamingRequest",
    requestStream: true,
    responseStream: true,
    requestSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => SimpleMessage.decode(value),
    responseSerialize: (value: SimpleMessage) =>
      Buffer.from(SimpleMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => SimpleMessage.decode(value),
  },
} as const;

export interface SimpleServiceServer extends UntypedServiceImplementation {
  unary: handleUnaryCall<SimpleMessage, SimpleMessage>;
  unaryWithError: handleUnaryCall<SimpleMessage, SimpleMessage>;
  clientStreamingRequest: handleClientStreamingCall<
    SimpleMessage,
    SimpleMessage
  >;
  clientStreamingRequestWithError: handleClientStreamingCall<
    SimpleMessage,
    SimpleMessage
  >;
  serverStreamingRequest: handleServerStreamingCall<Empty, SimpleMessage>;
  bidirectionalStreamingRequest: handleBidiStreamingCall<
    SimpleMessage,
    SimpleMessage
  >;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
