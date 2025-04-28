import { useState, useRef, useEffect } from "react";
import toggleIcon from "../../assets/dropdown-arrow.png";

type Option = { name: string; value: string };

type DropDownProps = {
    name: string;
    options: Option[];
    selected: string | null;
    onChange: (value: string) => void; // Callback when an option is chosen
};


//DropDown component: a custom-styled select box that toggles a list of options.
// - Click input or arrow to open/close the dropdown menu.
// - Click outside to close the menu.
const DropDown: React.FC<DropDownProps> = ({
    name,
    options,
    selected,
    onChange,
}) => {
    // State for dropdown open/closed
    const [toggle, setToggle] = useState(false);
    // Ref to the dropdown container, to detect outside clicks
    const containerRef = useRef<HTMLDivElement>(null);

    // Effect to listen for clicks outside the dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setToggle(false); // close dropdown if clicked outside
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []); // empty deps: attach listener once

    return (
        <div
            ref={containerRef}
            className="relative w-auto"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={toggle}
            aria-controls="dropdown-list"
        >
            {/* Floating label above input when something is selected */}
            {selected && (
                <div className="absolute -top-5 left-3 text-xs text-[var(--color-green)]">
                    {name}
                </div>
            )}

            <div className="bg-[var(--color-light-green)] border-[1px] border-[var(--color-border-green)] rounded-full cursor-pointer">
                <input
                    type="text"
                    readOnly
                    value={selected || name}
                    onClick={() => setToggle(!toggle)}
                    className="w-full border-none outline-none text-[var(--color-green)] font-semibold cursor-pointer px-3 py-1.5"
                />
                <img
                    src={toggleIcon}
                    onClick={() => setToggle(!toggle)}
                    className={`
            absolute right-3 top-1/2 transform -translate-y-1/2
            h-auto w-4 transition-transform duration-300 ease-in-out cursor-pointer
            ${toggle ? "rotate-180" : "rotate-0"}  
          `}
                    aria-hidden="true"
                />
            </div>

            {toggle && (
                <div
                    id="dropdown-list"
                    role="listbox"
                    className="
            absolute top-11 left-[2.5%] w-[95%]
            rounded-md p-1 bg-[var(--color-green)] shadow-md z-10 animate-shoot-down
          "
                >
                    {options.map((item) => {
                        const isActive = item.value === selected;
                        return (
                            <button
                                key={item.value}
                                role="option"
                                aria-selected={isActive}
                                onClick={() => {
                                    onChange(item.value);
                                    setToggle(false);
                                }}
                                className={`
                  block w-full text-left p-2 font-semibold transition-colors rounded-sm cursor-pointer
                  ${isActive
                                        ? "bg-[var(--color-black)] text-[var(--color-white)]"
                                        : "text-[var(--color-white)] hover:bg-[var(--color-card-green)]"
                                    }
                `}
                            >
                                {item.name}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropDown;
