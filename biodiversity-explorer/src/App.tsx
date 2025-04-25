import { useState } from 'react'
import SearchBar from './components/searchbar/Searchbar'
import Filters, { Filters as FiltersType } from './components/filter/Filters'
import Sort, { SortKey } from './components/sort/Sort'

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filters, setFilters] = useState<FiltersType>({
    region: '',
    habitat: '',
    threatLevel: '',
    taxonomicGroup: '',
  })

  const handleFilterChange = (key: keyof FiltersType, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const [sortKey, setSortKey] = useState<SortKey | null>(null)

  const handleSortChange = (key: SortKey) => {
    setSortKey(key)
  }

  return (
    <div className="max-w-[1280px] bg-[var(--color-black)] mx-auto p-8 space-y-8">

      <div className='flex items-center gap-4 justify-center w-full'>
        <SearchBar
          searchTerm={searchTerm}
          onChange={setSearchTerm}
        />
        <Sort
          sortKey={sortKey}
          onSortChange={handleSortChange}
        />
      </div>

      <div className='flex items-center justify-center flex-col gap-6 w-full my-20'>
        <h1 className='text-5xl font-bold'>Explore Earth’s Endangered Species</h1>
        <h3 className='text-xl text-balance text-center'>Filter and sort by region, habitat, and risk level to discover vulnerable wildlife.
          Learn how you can help protect each species’ future.</h3>
      </div>

      <Filters
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
