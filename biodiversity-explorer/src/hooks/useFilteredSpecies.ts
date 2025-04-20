import { useMemo } from "react";

interface Species {
  id: number;
  commonName: string;
  scientificName?: string;
  imageUrl?: string;
  status: string;
  region: string;
  habitat: string;
}

interface Filters {
  region: string[];
  habitat: string[];
  threatLevel: string[];
}

export type SortOption = "name" | "status";

export function useFilteredSpecies(
  items: Species[],
  searchTerm: string,
  filters: Filters,
  sortKey: SortOption
): Species[] {
  const { region, habitat, threatLevel } = filters;

  return useMemo(() => {
    let result = items;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (sp) =>
          sp.commonName.toLowerCase().includes(q) ||
          sp.scientificName?.toLowerCase().includes(q)
      );
    }

    result = result.filter((sp) => {
      const rMatch = !region.length || region.includes(sp.region);
      const hMatch = !habitat.length || habitat.includes(sp.habitat);
      const tMatch = !threatLevel.length || threatLevel.includes(sp.status);
      return rMatch && hMatch && tMatch;
    });

    const sorted = [...result];
    if (sortKey === "name") {
      sorted.sort((a, b) => a.commonName.localeCompare(b.commonName));
    } else {
      const rank = [
        "Least Concern",
        "Near Threatened",
        "Vulnerable",
        "Endangered",
        "Critically Endangered",
      ];
      sorted.sort((a, b) => rank.indexOf(a.status) - rank.indexOf(b.status));
    }

    return sorted;
  }, [
    items,
    searchTerm,
    region, 
    habitat,
    threatLevel,
    sortKey,
  ]);
}
