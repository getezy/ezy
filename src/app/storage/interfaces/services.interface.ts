export interface Service {
  name: string;
  path: string;
  includePaths: string[];
}

export interface ServicesStorage {
  services: Service[];
}
