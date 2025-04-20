// src/App.tsx
import React, { useState } from 'react'
import Navbar from './components/NavBar/NavBar'
import { SortOption } from './components/NavBar/Sort'

/** Shape of your filter state */
interface Filters {
  region: string[]
  habitat: string[]
  threatLevel: string[]
}

/** Initial empty filters */
const INITIAL_FILTERS: Filters = {
  region: [],
  habitat: [],
  threatLevel: [],
}

const App: React.FC = () => {
  // SearchBar state
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Filter pills state
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS)

  // Sort dropdown state (passed to Navbar)
  const [sortKey, setSortKey] = useState<SortOption>('name')

  /** Toggle a filter value on or off */
  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => {
      const exists = prev[key].includes(value)
      const updated = exists
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
      return { ...prev, [key]: updated }
    })
  }

  return (
    <div className="max-w-[1280px] mx-auto">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={filters}
        onFilterChange={handleFilterChange}
        sortKey={sortKey}
        onSortChange={setSortKey}
      />

      {/* 
        TODO: Once ready, render your CardGroup and SpeciesModal here:
          <CardGroup data={filteredData} onCardClick={...} />
          {selectedSpecies && (
            <SpeciesModal species={selectedSpecies} onClose={...} />
          )}
      */}
    </div>
  )
}

export default App
