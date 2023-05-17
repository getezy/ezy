/* eslint-disable */
import {
  UntypedServiceImplementation,
  handleUnaryCall,
  handleClientStreamingCall,
  handleServerStreamingCall,
  handleBidiStreamingCall,
} from "@grpc/grpc-js";
import Long from "long";
import { Empty } from "../google/protobuf/empty";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "simple_package.v1";

export interface SimpleMessage {
  id: string;
  snakeCaseField: string;
  camelCaseField: string;
}

export interface LongIntegersMessage {
  int: Long;
  uint: Long;
  sint: Long;
  fint: Long;
  sfint: Long;
}

function createBaseSimpleMessage(): SimpleMessage {
  return { id: "", snakeCaseField: "", camelCaseField: "" };
}

export const SimpleMessage = {
  encode(
    message: SimpleMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.snakeCaseField !== "") {
      writer.uint32(18).string(message.snakeCaseField);
    }
    if (message.camelCaseField !== "") {
      writer.uint32(26).string(message.camelCaseField);
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
        case 2:
          message.snakeCaseField = reader.string();
          break;
        case 3:
          message.camelCaseField = reader.string();
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
      snakeCaseField: isSet(object.snakeCaseField)
        ? String(object.snakeCaseField)
        : "",
      camelCaseField: isSet(object.camelCaseField)
        ? String(object.camelCaseField)
        : "",
    };
  },

  toJSON(message: SimpleMessage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.snakeCaseField !== undefined &&
      (obj.snakeCaseField = message.snakeCaseField);
    message.camelCaseField !== undefined &&
      (obj.camelCaseField = message.camelCaseField);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleMessage>, I>>(
    object: I
  ): SimpleMessage {
    const message = createBaseSimpleMessage();
    message.id = object.id ?? "";
    message.snakeCaseField = object.snakeCaseField ?? "";
    message.camelCaseField = object.camelCaseField ?? "";
    return message;
  },
};

function createBaseLongIntegersMessage(): LongIntegersMessage {
  return {
    int: Long.ZERO,
    uint: Long.UZERO,
    sint: Long.ZERO,
    fint: Long.UZERO,
    sfint: Long.ZERO,
  };
}

export const LongIntegersMessage = {
  encode(
    message: LongIntegersMessage,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.int.isZero()) {
      writer.uint32(8).int64(message.int);
    }
    if (!message.uint.isZero()) {
      writer.uint32(16).uint64(message.uint);
    }
    if (!message.sint.isZero()) {
      writer.uint32(24).sint64(message.sint);
    }
    if (!message.fint.isZero()) {
      writer.uint32(33).fixed64(message.fint);
    }
    if (!message.sfint.isZero()) {
      writer.uint32(41).sfixed64(message.sfint);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LongIntegersMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLongIntegersMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.int = reader.int64() as Long;
          break;
        case 2:
          message.uint = reader.uint64() as Long;
          break;
        case 3:
          message.sint = reader.sint64() as Long;
          break;
        case 4:
          message.fint = reader.fixed64() as Long;
          break;
        case 5:
          message.sfint = reader.sfixed64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LongIntegersMessage {
    return {
      int: isSet(object.int) ? Long.fromValue(object.int) : Long.ZERO,
      uint: isSet(object.uint) ? Long.fromValue(object.uint) : Long.UZERO,
      sint: isSet(object.sint) ? Long.fromValue(object.sint) : Long.ZERO,
      fint: isSet(object.fint) ? Long.fromValue(object.fint) : Long.UZERO,
      sfint: isSet(object.sfint) ? Long.fromValue(object.sfint) : Long.ZERO,
    };
  },

  toJSON(message: LongIntegersMessage): unknown {
    const obj: any = {};
    message.int !== undefined &&
      (obj.int = (message.int || Long.ZERO).toString());
    message.uint !== undefined &&
      (obj.uint = (message.uint || Long.UZERO).toString());
    message.sint !== undefined &&
      (obj.sint = (message.sint || Long.ZERO).toString());
    message.fint !== undefined &&
      (obj.fint = (message.fint || Long.UZERO).toString());
    message.sfint !== undefined &&
      (obj.sfint = (message.sfint || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LongIntegersMessage>, I>>(
    object: I
  ): LongIntegersMessage {
    const message = createBaseLongIntegersMessage();
    message.int =
      object.int !== undefined && object.int !== null
        ? Long.fromValue(object.int)
        : Long.ZERO;
    message.uint =
      object.uint !== undefined && object.uint !== null
        ? Long.fromValue(object.uint)
        : Long.UZERO;
    message.sint =
      object.sint !== undefined && object.sint !== null
        ? Long.fromValue(object.sint)
        : Long.ZERO;
    message.fint =
      object.fint !== undefined && object.fint !== null
        ? Long.fromValue(object.fint)
        : Long.UZERO;
    message.sfint =
      object.sfint !== undefined && object.sfint !== null
        ? Long.fromValue(object.sfint)
        : Long.ZERO;
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
  longIntegers: {
    path: "/simple_package.v1.SimpleService/LongIntegers",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: LongIntegersMessage) =>
      Buffer.from(LongIntegersMessage.encode(value).finish()),
    requestDeserialize: (value: Buffer) => LongIntegersMessage.decode(value),
    responseSerialize: (value: LongIntegersMessage) =>
      Buffer.from(LongIntegersMessage.encode(value).finish()),
    responseDeserialize: (value: Buffer) => LongIntegersMessage.decode(value),
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
  longIntegers: handleUnaryCall<LongIntegersMessage, LongIntegersMessage>;
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
  : T extends Long
  ? string | number | Long
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
