import { useEnvironmentsStore, useSettingsStore, useTlsPresetsStore } from '@new-storage';

export function useStorageFetch() {
  const fetchSettings = useSettingsStore((state) => state.fetch);
  const fetchEnvironments = useEnvironmentsStore((state) => state.fetch);
  const fetchTlsPresets = useTlsPresetsStore((state) => state.fetch);

  return function fetch() {
    return Promise.all([fetchSettings(), fetchEnvironments(), fetchTlsPresets()]);
  };
}
