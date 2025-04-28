import { useEffect, useMemo, useState } from "react";

import speciesRaw from "../species.json";

// type representing each species row in our local data source
export type SpeciesRow = {
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
};

// type for filter criteria in the UI
export type Filters = {
  region: SpeciesRow["region"] | "";
  habitat: SpeciesRow["habitat"] | "";
  threatLevel: SpeciesRow["threat_level"] | "";
  taxonomicGroup: SpeciesRow["taxon"] | "";
};

// In-memory cache to avoid refetching the same thumbnails repeatedly
const imgCache = new Map<string, string>();

// Placeholder SVG used when no thumbnail is available
const BLANK_THUMB =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNkZGRkZGQiIC8+PC9zdmc+";

// Fetches a thumbnail URL for the given species name.
// Caches results in imgCache, returns BLANK_THUMB on error.
async function fetchThumb(name: string): Promise<string> {
  // Return cached version if present
  if (imgCache.has(name)) {
    return imgCache.get(name)!;
  }

  try {
    // Call the iNaturalist API for the species
    const res = await fetch(
      `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(
        name
      )}&per_page=1`
    );
    const json = await res.json();
    const photo = json?.results?.[0]?.default_photo;
    // Choose medium URL if available, else fallback
    const url = photo?.medium_url || photo?.url || "";
    imgCache.set(name, url || "");
    return url || "";
  } catch {
    // On any error, cache blank and return it
    imgCache.set(name, "");
    return "";
  }
}

// Custom hook: filters raw species data, then fetches thumbnails for each entry.
export function useSpecies(filters: Filters) {
  // State for the processed, thumbnail-enriched species rows
  const [data, setData] = useState<SpeciesRow[]>([]);
  // Loading flag during thumbnail fetch
  const [loading, setLoading] = useState<boolean>(false);
  // Error message if thumbnail fetch fails
  const [error, setError] = useState<string | null>(null);

  // useMemo: apply local filters against static JSON data and runs only when `filters` change.
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

  // useEffect: whenever `filtered` changes, fetch thumbnails in parallel and it cleans up to avoid setting state on unmounted components.
  useEffect(() => {
    let isCancelled = false;

    async function enrich() {
      setLoading(true);
      setError(null);
      try {
        // Fetch thumbnails for each filtered row
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
          // Normalize error message
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
      // Prevent state updates after unmounting
      isCancelled = true;
    };
  }, [filtered]);

  // Return the  data array, loading flag, and any error message
  return { data, loading, error };
}
