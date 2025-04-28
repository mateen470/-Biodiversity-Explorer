import { FC, useState, useEffect, ChangeEvent } from 'react'

import searchIcon from '../../assets/search-icon.png'
import { useDebounce } from '../../hooks/useDebounce'

type SearchBarProps = {
    searchTerm: string
    onChange: (term: string) => void  // callback to notify parent of debounced value
}

// Searchbar component provides a debounced text input with a search icon
const Searchbar: FC<SearchBarProps> = ({ searchTerm, onChange }) => {
    const [input, setInput] = useState(searchTerm)
    // Debounce the input value so we only notify parent after 300ms of no typing
    const debounced = useDebounce(input, 300)

    // If parent searchTerm prop changes update local input
    useEffect(() => {
        setInput(searchTerm)
    }, [searchTerm])

    // When the debounced value changes, call the parent's onChange
    useEffect(() => {
        onChange(debounced)
    }, [debounced, onChange])

    return (
        <div
            className="relative w-full bg-[var(--color-light-green)] border-[1px] border-[var(--color-border-green)] rounded-full cursor-pointer"
        >
            <img
                src={searchIcon}
                alt="Search"
                className="pointer-events-none absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2"
            />
            <input
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                placeholder="Search..."
                className="
                    w-full pl-12 pr-4 py-1.5
                    border-none outline-none
                    text-gray-400 font-semibold placeholder:text-gray-400
                "
            />
        </div>
    )
}

export default Searchbar
