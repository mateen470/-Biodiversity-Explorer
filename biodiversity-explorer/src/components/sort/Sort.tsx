import React from 'react';
import DropDown from '../dropdown/Dropdown';
import optionsData from '../../options.json';

export type SortKey = typeof optionsData.sortingOptions[number]['value'];

type SortProps = {
    sortKey: SortKey | null;
    onSortChange: (key: SortKey) => void;
};


// Sort component renders a dropdown for choosing sort criteria.
//It leverages the same DropDown component and reading options from optionsData.
const Sort: React.FC<SortProps> = ({ sortKey, onSortChange }) => (
    <DropDown
        name="Sort By"
        options={optionsData.sortingOptions.map(opt => ({ // Build options array
            name: opt.label, // Display label
            value: opt.value, // Underlying sort key
        }))}
        selected={sortKey}
        onChange={onSortChange} // Notify parent when selection changes
    />
);

export default Sort;
