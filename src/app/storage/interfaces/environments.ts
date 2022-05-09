export interface Environment {
  id: string;
  url: string;
  color: string;
}

export interface EnvironmentsStorage {
  environments: Environment[];
}
