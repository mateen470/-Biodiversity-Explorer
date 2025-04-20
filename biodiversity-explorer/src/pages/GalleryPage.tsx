import React, { useState } from "react";
import { useSpecies } from "../hooks/useSpecies";
import { FilterPills } from "../components/FilterPills/FilterPills";
import { Gallery } from "../components/Gallery/Gallery";
import { DetailPanel } from "../components/DetailPanel/DetailPanel";
import { Species } from "../types";

export const GalleryPage: React.FC = () => {
  const { data, loading, error, filters, setFilters, loadMore } = useSpecies();
  const [selected, setSelected] = useState<Species | null>(null);

  return (
    <div className="p-4">
      <FilterPills
        filters={filters}
        onChange={(key, vals) =>
          setFilters(prev => ({ ...prev, [key]: vals }))
        }
      />

      {error && <p className="text-red-500">{error}</p>}

      {/* Pass the correct setter */}
      <Gallery data={data} onCardClick={setSelected} />

      {loading && <p>Loading...</p>}

      {selected && (
        <DetailPanel species={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};
