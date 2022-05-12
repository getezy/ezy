export interface Service {
  id: string;
  name: string;
}

export interface ServicesStorage {
  services: Service[];

  create: (service: Omit<Service, 'id'>) => void;
  remove: (id: string) => void;
}
