import {
  useEnvironmentsStore,
  useSettingsStore,
  useTabsStore,
  useTlsPresetsStore,
} from '@new-storage';

export function useStorageFetch() {
  const fetchSettings = useSettingsStore((state) => state.fetch);
  const fetchEnvironments = useEnvironmentsStore((state) => state.fetch);
  const fetchTlsPresets = useTlsPresetsStore((state) => state.fetch);
  const fetchTabs = useTabsStore((state) => state.fetch);

  return function fetch() {
    return Promise.all([fetchSettings(), fetchEnvironments(), fetchTlsPresets(), fetchTabs()]);
  };
}
