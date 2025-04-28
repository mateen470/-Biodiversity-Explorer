import { useEffect, useMemo, useState } from "react";

import speciesRaw from "../species.json";

export interface SpeciesRow {
  id: number;
  scientific_name: string;
  common_name: string;
  summary: string;
  conservation_action: string;
  threat_level: "Vulnerable" | "Endangered" | "Critically Endangered";
  region:
    | "Africa"
    | "Asia"
    | "Europe"
    | "North America"
    | "South America"
    | "Oceania";
  habitat: "Forest" | "Grassland" | "Wetland" | "Coastal" | "Desert" | "Tundra";
  taxon: "Mammals" | "Birds" | "Reptiles" | "Amphibians" | "Fish" | "Plants";
  published_year: number;
  imageUrl: string;
}

export interface Filters {
  region: SpeciesRow["region"] | "";
  habitat: SpeciesRow["habitat"] | "";
  threatLevel: SpeciesRow["threat_level"] | "";
  taxonomicGroup: SpeciesRow["taxon"] | "";
}

const imgCache = new Map<string, string>();
const BLANK_THUMB =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNkZGRkZGQiIC8+PC9zdmc+";

async function fetchThumb(name: string): Promise<string> {
  if (imgCache.has(name)) {
    return imgCache.get(name)!;
  }
  try {
    const res = await fetch(
      `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(
        name
      )}&per_page=1`
    );
    const json = await res.json();
    const photo = json?.results?.[0]?.default_photo;
    const url = photo?.medium_url || photo?.url || "";
    imgCache.set(name, url || "");
    return url || "";
  } catch {
    imgCache.set(name, "");
    return "";
  }
}

export function useSpecies(filters: Filters) {
  const [data, setData] = useState<SpeciesRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo<SpeciesRow[]>(() => {
    return (speciesRaw as SpeciesRow[]).filter((row) => {
      if (filters.region && row.region !== filters.region) return false;
      if (filters.habitat && row.habitat !== filters.habitat) return false;
      if (filters.threatLevel && row.threat_level !== filters.threatLevel)
        return false;
      if (filters.taxonomicGroup && row.taxon !== filters.taxonomicGroup)
        return false;
      return true;
    });
  }, [filters]);

  useEffect(() => {
    let isCancelled = false;
    async function enrich() {
      setLoading(true);
      setError(null);
      try {
        const enriched = await Promise.all(
          filtered.map(async (row) => {
            const thumb = await fetchThumb(row.scientific_name);
            return { ...row, imageUrl: thumb || BLANK_THUMB };
          })
        );
        if (!isCancelled) {
          setData(enriched);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          if (err instanceof Error) setError(err.message);
          else setError(String(err));
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    enrich();
    return () => {
      isCancelled = true;
    };
  }, [filtered]);

  return { data, loading, error };
}
