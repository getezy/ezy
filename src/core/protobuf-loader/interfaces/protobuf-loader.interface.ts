export type MethodInfo = {
  name: string;
  isStream: boolean;
};

export type ServiceInfo = {
  name: string;
  methods?: MethodInfo[];
};

export type PackageInfo = {
  name: string;
  services?: ServiceInfo[];
};
