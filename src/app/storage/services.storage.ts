import create from 'zustand';

import { ServicesStorage } from './interfaces';

export const useServicesStore = create<ServicesStorage>(() => ({
  services: [],
}));
