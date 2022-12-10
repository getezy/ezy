import { produce } from 'immer';
import create from 'zustand';

import { GrpcMethodType } from '@core/types';

export type GrpcBaseTabContext = {
  callId?: string;
};

export type GrpcUnaryTabContext = GrpcBaseTabContext & {
  isLoading: boolean;
};

export type GrpcClientStreamingTabContext = GrpcBaseTabContext & {
  isClientStreaming: boolean;
};

export type GrpcServerStreamingTabContext = GrpcBaseTabContext & {
  isServerStreaming: boolean;
};

export type GrpcBidirectionalStreamingTabContext = GrpcBaseTabContext & {
  isClientStreaming: boolean;
  isServerStreaming: boolean;
};

export type GrpcTabContext<T extends GrpcMethodType> = T extends GrpcMethodType.UNARY
  ? GrpcUnaryTabContext
  : T extends GrpcMethodType.CLIENT_STREAMING
  ? GrpcClientStreamingTabContext
  : T extends GrpcMethodType.SERVER_STREAMING
  ? GrpcServerStreamingTabContext
  : T extends GrpcMethodType.BIDIRECTIONAL_STREAMING
  ? GrpcBidirectionalStreamingTabContext
  : never;

export interface GrpcTabContextStore {
  tabs: Map<string, GrpcTabContext<GrpcMethodType>>;
  setContext: <T extends GrpcMethodType>(id: string, context: GrpcTabContext<T>) => void;
  updateContext: <T extends GrpcMethodType>(
    id: string,
    context: Partial<GrpcTabContext<T>>
  ) => void;
  getContext: <T extends GrpcMethodType>(id: string) => GrpcTabContext<T> | undefined;
  deleteContext: (id: string) => void;
}

export const useGrpcTabContextStore = create<GrpcTabContextStore>()((set, get) => ({
  tabs: new Map(),
  setContext: (id, context) =>
    set(
      produce<GrpcTabContextStore>((state) => {
        state.tabs.set(id, context);
      })
    ),
  updateContext: (id, context) =>
    set(
      produce<GrpcTabContextStore>((state) => {
        const tabContext = state.tabs.get(id);
        if (tabContext) {
          state.tabs.set(id, {
            ...tabContext,
            ...context,
          });
        }
      })
    ),
  getContext: <T extends GrpcMethodType>(id: string) => {
    const context = get().tabs.get(id);
    if (context) {
      return context as GrpcTabContext<T>;
    }

    return undefined;
  },
  deleteContext: (id) =>
    set(
      produce<GrpcTabContextStore>((state) => {
        state.tabs.delete(id);
      })
    ),
}));
