// File: src/hooks/useSpecies.ts
import { useState, useEffect } from "react";
import axios from "axios";

export interface SpeciesInfo {
  id: number;
  scientific_name: string;
  main_common_name: string;
  category: string;
  taxonomic_group: string;
  imageUrl?: string;
}

export function useINaturalistSpecies(count: number = 20) {
  const [data, setData] = useState<SpeciesInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    async function fetchSpecies() {
      setLoading(true);
      setError(undefined);

      try {
        const res = await axios.get<{
          results: Array<{
            id: number;
            name: string;
            preferred_common_name?: string;
            conservation_status?: { status: string };
            default_photo?: { url: string };
            ancestors?: Array<{ rank: string; name: string }>;
          }>;
        }>("https://api.inaturalist.org/v1/taxa", {
          params: { rank: "species", per_page: count },
        });

        const speciesList: SpeciesInfo[] = res.data.results.map((t) => {
          // 1) Default ancestors to empty array if missing
          const ancestors = Array.isArray(t.ancestors) ? t.ancestors : [];
          // 2) Safely pick out the 'class' ancestor
          const taxClass =
            ancestors.find((a) => a.rank === "class")?.name || "Unknown";

          return {
            id: t.id,
            scientific_name: t.name,
            main_common_name: t.preferred_common_name || t.name,
            category: t.conservation_status?.status || "Unknown",
            taxonomic_group: taxClass,
            imageUrl: t.default_photo?.url,
          };
        });

        setData(speciesList);
      } catch (e: any) {
        console.error("Error fetching iNaturalist species:", e);
        setError(e.message || "Failed to fetch species");
      } finally {
        setLoading(false);
      }
    }

    fetchSpecies();
  }, [count]);

  return { data, loading, error };
}
