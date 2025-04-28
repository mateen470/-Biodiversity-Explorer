import React from 'react'

import DropDown from '../dropdown/Dropdown'
import optionsData from '../../options.json'

export type SortKey = typeof optionsData.sortingOptions[number]['value']

type SortProps = {
    sortKey: SortKey | null;
    onSortChange: (key: SortKey) => void
}

const Sort: React.FC<SortProps> = ({ sortKey, onSortChange }) => (
    <DropDown
        name="Sort By"
        options={optionsData.sortingOptions.map(opt => ({
            name: opt.label,
            value: opt.value,
        }))}
        selected={sortKey}
        onChange={onSortChange}
    />
)

export default Sort
