import React from 'react'
import DropDown from '../dropdown/Dropdown'
import optionsData from '../../options.json'

type FilterKey = typeof optionsData.filters[number]['name']

export type Filters = Record<FilterKey, string>

type FiltersProps = {
    filters: Filters
    onFilterChange: (key: FilterKey, value: string) => void
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange }) => {
    return (
        <div className="flex flex-wrap gap-4 justify-center items-center">
            <h1 className='font-bold text-2xl'>Filters :</h1>
            {optionsData.filters.map(({ name, options }) => (
                <div key={name}>
                    <DropDown
                        name={name}
                        options={options.map(o => ({ name: o, value: o }))}
                        selected={filters[name]}
                        onChange={value => onFilterChange(name as FilterKey, value)}
                    />
                </div>
            ))}
        </div>
    )
}

export default Filters
