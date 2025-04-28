import React from 'react';
import DropDown from '../dropdown/Dropdown';
import optionsData from '../../options.json';
import type { Filters as HookFilters } from '../../hooks/useSpecies';

type FilterLabel = typeof optionsData.filters[number]['name']; // Type of each filter label from JSON

// Map UI labels (Region, Habitat, Severity, Taxon) to HookFilters keys
const labelToKey: Record<FilterLabel, keyof HookFilters> = {
  Region: 'region',
  Habitat: 'habitat',
  Severity: 'threatLevel',
  Taxon: 'taxonomicGroup',
};

type FiltersProps = {
  filters: HookFilters;
  onFilterChange: (key: keyof HookFilters, value: string) => void; // Callback to update filter
}

// Filters component renders a row of dropdowns for each filter category
const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      <h1 className="font-bold text-2xl">Filters:</h1>

      {/* Iterate over filter definitions from options.json */}
      {optionsData.filters.map(({ name, options }) => {
        // Determine the corresponding key in our filter state for this dropdown
        const key = labelToKey[name as FilterLabel];
        return (
          <div key={name} className="flex flex-col">
            <DropDown
              name={name}
              options={options.map(o => ({ name: o, value: o }))}
              selected={filters[key]}
              onChange={value => onFilterChange(key, value)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Filters;
