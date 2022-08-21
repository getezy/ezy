import React from 'react';
import { useEffectOnce } from 'react-use';

export interface IAppContext {
  platform: {
    os: string;
    setOs: (os: string) => void;
  };
  modal: {
    createCollectionModalVisible: boolean;
    setCreateCollectionModalVisible: (visible: boolean) => void;
  };
}

export const AppContext = React.createContext<IAppContext | null>(null);

export const AppProvider = AppContext.Provider;

export function useAppContextProvider() {
  const [createCollectionModalVisible, setCreateCollectionModalVisible] = React.useState(false);
  const [os, setOs] = React.useState('darwin');

  useEffectOnce(() => {
    window.os.get().then((value) => {
      setOs(value);
    });
  });

  const value: IAppContext = {
    platform: {
      os,
      setOs,
    },
    modal: {
      createCollectionModalVisible,
      setCreateCollectionModalVisible,
    },
  };

  return {
    value,
    AppProvider,
  };
}
