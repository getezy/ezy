import { useEnvironmentsStore, useSettingsStore } from '@new-storage';

export function useStorageFetch() {
  const fetchSettings = useSettingsStore((state) => state.fetch);
  const fetchEnvironment = useEnvironmentsStore((state) => state.fetch);

  return function fetch() {
    return Promise.all([fetchSettings(), fetchEnvironment()]);
  };
}
