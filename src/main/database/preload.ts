import { ipcRenderer } from 'electron';

export const Database = {
  settings: {
    // get: async (key: string): Promise<any> => {
    //   const value = await ipcRenderer.invoke('db:get', key);

    //   return value;
    // },
    // update: (key: string, value: any): Promise<void> =>
    //   ipcRenderer.invoke('db:update', { key, value }),
    getItem<T = any>(key: string): Promise<T> {
      return ipcRenderer.invoke('db:get', key);
    },
    setItem<T = any>(key: string, value: T): Promise<void> {
      setTimeout(() => {
        ipcRenderer.invoke('db:update', { key, value });
      }, 0);

      return Promise.resolve();
    },
    removeItem(key: string): Promise<void> {
      setTimeout(() => {
        ipcRenderer.invoke('db:remove', key);
      }, 0);

      return Promise.resolve();
    },
  },
};
