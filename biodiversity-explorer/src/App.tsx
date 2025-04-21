import { useState } from 'react'
import Filters, { Filters as FiltersType } from './components/filter/Filters'
import Sort, { SortKey } from './components/sort/Sort'

function App() {
  const [filters, setFilters] = useState<FiltersType>({
    region: '',
    habitat: '',
    threatLevel: '',
    taxonomicGroup: '',
  })

  const handleFilterChange = (key: keyof FiltersType, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  const [sortKey, setSortKey] = useState<SortKey | null>(null)

  const handleSortChange = (key: SortKey) => {
    setSortKey(key)
  }

  return (
    <div className="max-w-[1280px] bg-[var(--color-black)] mx-auto p-8 space-y-6">
      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <Sort
        sortKey={sortKey}
        onSortChange={handleSortChange}
      />
    </div>
  )
}

export default App
