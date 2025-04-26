import { useState, useEffect } from 'react';
import SearchBar from './components/searchbar/Searchbar';
import Filters, { Filters as FiltersType } from './components/filter/Filters';
import Sort, { SortKey } from './components/sort/Sort';
import CardGrid from './components/card-grid/CardGrid';
import { useINaturalistSpecies, SpeciesInfo } from './hooks/useSpecies';

const sortKeyMap: Record<SortKey, 'name' | 'taxon'> = {
  'Name (A–Z)': 'name',
  'Threat Severity': 'taxon',
  'Newest Listed': 'name',
  'Oldest Listed': 'name',
};

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<FiltersType>({
    region: '',
    habitat: '',
    threatLevel: '',
    taxonomicGroup: '',
  });
  const [sortKey, setSortKey] = useState<SortKey | null>(null);

  const { data: species = [], loading, error } = useINaturalistSpecies(20);

  useEffect(() => {
    console.log('iNaturalist species data:', species);
  }, [species]);

  const handleFilterChange = (key: keyof FiltersType, value: string) =>
    setFilters(prev => ({ ...prev, [key]: value }));
  const handleSortChange = (key: SortKey) => setSortKey(key);

  const displayed = species.filter(s => {
    if (filters.threatLevel && s.category !== filters.threatLevel) return false;
    if (filters.taxonomicGroup && s.taxonomic_group !== filters.taxonomicGroup) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        s.scientific_name.toLowerCase().includes(term) ||
        s.main_common_name.toLowerCase().includes(term)
      );
    }
    return true;
  });

  if (sortKey) {
    const key = sortKeyMap[sortKey];
    if (key === 'name') {
      displayed.sort((a, b) => a.scientific_name.localeCompare(b.scientific_name));
    }
  }

  const items = displayed.map((s: SpeciesInfo) => ({
    imgUrl: s.imageUrl || '',
    title: s.main_common_name,
    summary: `Conservation status: ${s.category}`,
    labels: [s.category, s.taxonomic_group],
    conservationActions: "",
    onSelect: () => console.log('Select species', s.id),
  }));

  return (
    <div className="scrollbar-hide max-w-[1280px] bg-[var(--color-black)] mx-auto p-8 space-y-8">
      <div className="flex items-center gap-4 justify-center w-full">
        <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />
        <Sort sortKey={sortKey} onSortChange={handleSortChange} />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 w-full my-20">
        <h1 className="text-5xl font-bold">Explore Top iNaturalist Species</h1>
        <h3 className="text-xl text-balance text-center">
          Filter and sort by conservation status and taxonomic class.
        </h3>
      </div>

      <Filters filters={filters} onFilterChange={handleFilterChange} />

      <CardGrid
        items={items}
        loading={loading}
        error={error}
        onCardSelect={item => console.log('Navigate to detail for', item)}
      />
    </div>
  );
}

export default App;
