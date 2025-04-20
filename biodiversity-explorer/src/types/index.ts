export interface Species {
  id: number;
  commonName: string;
  scientificName?: string;
  imageUrl?: string;
  status: string;
}

export interface Filters {
  region: string[];
  habitat: string[];
  threatLevel: string[];
}
