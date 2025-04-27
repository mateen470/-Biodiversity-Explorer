import React from 'react';
import DropDown from '../dropdown/Dropdown';
import optionsData from '../../options.json';

// 1️⃣ Import the hook’s Filters type
import type { Filters as HookFilters } from '../../hooks/useSpecies';

// 2️⃣ Derive the label union from your JSON
type FilterLabel = typeof optionsData.filters[number]['name'];

// 3️⃣ Map UI labels → hook keys
const labelToKey: Record<FilterLabel, keyof HookFilters> = {
  Region:       'region',
  Habitat:      'habitat',
  Severity:     'threatLevel',
  Taxon:        'taxonomicGroup',
};

interface FiltersProps {
  filters: HookFilters;                                // use the same Filters
  onFilterChange: (key: keyof HookFilters, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <h1 className="font-bold text-2xl">Filters:</h1>
      {optionsData.filters.map(({ name, options }) => {
        const key = labelToKey[name];
        return (
          <div key={name} className="flex flex-col">
            <DropDown
              name={name}
              options={options.map(o => ({ name: o, value: o }))}
              selected={filters[key]}                   // controlled value
              onChange={value => onFilterChange(key, value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
