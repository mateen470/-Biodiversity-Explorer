import { useState, useMemo } from "react";

import SearchBar from "./components/searchbar/Searchbar";
import Filters from "./components/filter/Filters";
import type { Filters as HookFilters } from "./hooks/useSpecies";
import Sort, { SortKey } from "./components/sort/Sort";
import CardGrid from "./components/card-grid/CardGrid";
import LoadingSpinner from "./utility/LoadingSpinner";
import { useSpecies, SpeciesRow } from "./hooks/useSpecies";
import { useDebounce } from "./hooks/useDebounce";

// Mapping from UI sort labels to actual SpeciesRow fields
const sortKeyMap: Record<SortKey, keyof SpeciesRow> = {
  "Name (A–Z)": "scientific_name",
  "Threat Severity": "threat_level",
  "Newest Listed": "published_year",
  "Oldest Listed": "published_year",
};

// Handles search, filter, sort, pagination, and routing to detail pages
export default function App() {
  // State: current filters (region, habitat, severity, taxon)
  const [filters, setFilters] = useState<HookFilters>({
    region: "",
    habitat: "",
    threatLevel: "",
    taxonomicGroup: "",
  });

  // State: raw search input and debounced value for performance
  const [searchTerm, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // State: current sort key and number of visible items (pagination)
  const [sortKey, setSort] = useState<SortKey | null>(null);
  const [visible, setVisible] = useState<number>(20);

  // Custom hook: returns filtered/thumbnails-enriched species data
  const { data: all, loading, error } = useSpecies(filters);

  // Memoized search: filter `all` by debounced search input
  const searched = useMemo(
    () =>
      all.filter(s =>
        !debouncedSearch ||
        (`${s.scientific_name}${s.common_name}`)
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase())
      ),
    [all, debouncedSearch]
  );

  // Memoized sorting: apply selected sortKey to `searched`
  const arranged = useMemo(() => {
    const arr = [...searched];
    if (!sortKey) return arr; // no sort: return copy

    const field = sortKeyMap[sortKey];
    if (field === "published_year") {
      // Numeric sort for year
      const desc = sortKey === "Newest Listed";
      return arr.sort((a, b) =>
        desc
          ? b.published_year - a.published_year
          : a.published_year - b.published_year
      );
    }
    if (field === "threat_level") {
      // Custom rank sort for threat levels
      const rank = (t: SpeciesRow["threat_level"]) =>
        t === "Critically Endangered" ? 0 : t === "Endangered" ? 1 : 2;
      return arr.sort((a, b) => rank(a.threat_level) - rank(b.threat_level));
    }
    // Default lexicographic sort for string fields
    return arr.sort((a, b) =>
      (a[field] as string).localeCompare(b[field] as string)
    );
  }, [searched, sortKey]);

  // Pagination slice: only show the first `visible` items
  const displayed = useMemo(
    () => arranged.slice(0, visible),
    [arranged, visible]
  );

  // Prepare card props for rendering in CardGrid
  const cards = displayed.map(s => ({
    id: s.id,
    imgUrl: s.imageUrl,
    title: s.common_name || s.scientific_name,
    summary: s.summary,
    labels: [s.threat_level, s.taxon, s.region],
    conservationActions: s.conservation_action,
    onSelect: () => console.log("detail", s.id), // placeholder
  }));

  // Handler to show more items when "Load more" is clicked
  const loadMore = () => setVisible(v => Math.min(v + 20, arranged.length));

  // Handler for updating filter state; resets pagination
  const handleFilterChange = (
    key: keyof HookFilters,
    value: string
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setVisible(20);
  };

  return (
    <div className="max-w-[1280px] mx-auto p-8 space-y-8">
      <SearchBar searchTerm={searchTerm} onChange={setSearch} />

      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <div className="flex flex-col items-center justify-center gap-6 w-full my-20">
        <h1 className="text-5xl font-bold">Explore Earth’s Endangered Species</h1>
        <h3 className="text-xl text-balance text-center">
          Filter and sort by region, habitat, and risk level to discover vulnerable wildlife.
          Learn how you can help protect each species’ future.
        </h3>
      </div>

      <div className="w-full flex justify-end">
        <Sort sortKey={sortKey} onSortChange={setSort} />
      </div>

      {loading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error loading data</div>
      ) : displayed.length === 0 ? (
        <div className="text-center text-gray-600">
          No species match your criteria.
        </div>
      ) : (
        <CardGrid
          items={cards}
          onCardSelect={c => console.log("detail", c)}
          loading={false}
          error={undefined}
        />
      )}

      {!loading && displayed.length > 0 && visible < arranged.length && (
        <div className="flex justify-center">
          <button
            className="mt-6 px-6 py-2 bg-[var(--color-light-green)] border-[1px] border-[var(--color-border-green)] rounded-full cursor-pointer text-[var(--color-white)] font-bold text-lg"
            onClick={loadMore}
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
