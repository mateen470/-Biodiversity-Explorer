import React from 'react'
import SearchBar from './SearchBar'
import { Filter } from './Filter'
import { Sort, SortOption } from './Sort'

interface Filters {
    region: string[]
    habitat: string[]
    threatLevel: string[]
}

interface NavbarProps {
    searchTerm: string
    onSearchChange: (value: string) => void

    filters: Filters
    onFilterChange: (key: keyof Filters, value: string) => void

    sortKey: SortOption
    onSortChange: (key: SortOption) => void
}

const Navbar: React.FC<NavbarProps> = ({
    searchTerm,
    onSearchChange,
    filters,
    onFilterChange,
    sortKey,
    onSortChange,
}) => (
    <header className="w-full bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row items-stretch lg:items-center gap-3 lg:gap-6">
            <div className="flex-1">
                <SearchBar value={searchTerm} onChange={onSearchChange} />
            </div>

            <div className="w-full lg:w-auto flex justify-start lg:justify-end">
                <Sort sortKey={sortKey} onChange={onSortChange} />
            </div>

            <div className="w-full lg:w-auto">
                <Filter filters={filters} onChange={onFilterChange} />
            </div>
        </div>
    </header>
)

export default Navbar
