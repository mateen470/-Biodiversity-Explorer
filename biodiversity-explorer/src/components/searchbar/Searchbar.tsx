// src/components/SearchBar/SearchBar.tsx
import { FC, useState, useEffect, ChangeEvent } from 'react'
import searchIcon from '../../assets/search-icon.png'
import { useDebounce } from '../../hooks/useDebounce'

type SearchBarProps = {
    searchTerm: string
    onChange: (term: string) => void
}

const Searchbar: FC<SearchBarProps> = ({ searchTerm, onChange }) => {
    const [input, setInput] = useState(searchTerm)
    const debounced = useDebounce(input, 300)

    useEffect(() => {
        setInput(searchTerm)
    }, [searchTerm])

    useEffect(() => {
        onChange(debounced)
    }, [debounced, onChange])

    return (
        <div className="relative w-full max-w-sm">
            <img
                src={searchIcon}
                alt="Search"
                className="pointer-events-none absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-gray-500"
            />
            <input
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Search..."
                className="
          w-full pl-12 pr-4 py-2
          border border-gray-300 rounded-lg
          text-gray-500 text-sm
          focus:outline-none focus:ring-2 focus:ring-green-300
        "
            />
        </div>
    )
}

export default Searchbar
