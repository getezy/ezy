export enum MethodType {
  UNARY = 'unary',
  STREAM = 'stream',
}

export type MethodInfo = {
  name: string;
  type: MethodType;
};

export type ServiceInfo = {
  name: string;
  methods?: MethodInfo[];
};

export type PackageInfo = {
  name: string;
  services?: ServiceInfo[];
};
