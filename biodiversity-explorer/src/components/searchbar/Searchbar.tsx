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
        <div className="relative w-full bg-[var(--color-light-green)]  border-[1px] border-[var(--color-border-green)] rounded-full cursor-pointer">
            <img
                src={searchIcon}
                alt="Search"
                className="pointer-events-none absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 "
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
