import { FC, ChangeEvent, useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
    value: string;
    onChange: (newValue: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ value, onChange }) => {
    const [input, setInput] = useState(value);
    const debouncedInput = useDebounce(input, 300);
    useEffect(() => {
        onChange(debouncedInput);
    }, [debouncedInput, onChange]);

    return (
        <div className="min-w-0 flex-1 px-12 lg:hidden">
            <div className="mx-auto grid w-full max-w-xs grid-cols-1 relative">
                <input
                    type="search"
                    name="search"
                    aria-label="Search"
                    className="peer col-start-1 row-start-1 block w-full rounded-md bg-white/20 py-1.5 pr-3 pl-10 text-base text-white placeholder:text-white focus:bg-white focus:text-gray-900 focus:outline-2 focus:outline-offset-2 focus:outline-white/40 focus:placeholder:text-gray-400 sm:text-sm"
                    placeholder="Search"
                    value={input}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setInput(e.target.value)
                    }
                />
                <svg
                    className="pointer-events-none col-start-1 row-start-1 ml-3 self-center text-white peer-focus:text-gray-400 absolute"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SearchBar;
