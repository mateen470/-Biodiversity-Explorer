import axios from "axios";
import { Species } from "../types";

export interface FetchParams {
  page?: number;
  perPage?: number;
  filters?: Record<string, string[]>;
}

export async function fetchSpecies({
  page = 1,
  perPage = 20,
  filters = {},
}: FetchParams): Promise<Species[]> {
  const params: any = {
    page,
    per_page: perPage,
    ...Object.entries(filters).reduce((acc, [key, vals]) => {
      if (vals.length) acc[key] = vals.join(",");
      return acc;
    }, {} as Record<string, string>),
  };

  const response = await axios.get(
    "https://api.inaturalist.org/v1/observations",
    { params }
  );
  return response.data.results.map((o: any) => ({
    id: o.id,
    commonName: o.species_guess,
    scientificName: o.taxon?.name,
    imageUrl: o.photos?.[0]?.url,
    status: o.taxon?.conservation_status?.status_name || "Unknown",
  }));
}
