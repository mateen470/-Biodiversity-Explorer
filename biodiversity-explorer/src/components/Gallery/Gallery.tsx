import React, { useRef } from "react";
import { useVirtualizer } from '@tanstack/react-virtual';
import { SpeciesCard } from '../Card/SpeciesCard';
import { Species } from "../../types";

interface Props { data: Species[]; onCardClick: (s: Species) => void; }

export const Gallery: React.FC<Props> = ({ data, onCardClick }) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const rowVirtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 200,
    });

    return (
        <div ref={parentRef} className="h-[80vh] overflow-auto">
            <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
                {rowVirtualizer.getVirtualItems().map(virtualRow => {
                    const item = data[virtualRow.index];
                    return (
                        <div
                            key={item.id}
                            style={{ position: 'absolute', top: virtualRow.start, left: 0, width: '100%' }}
                        >
                            <SpeciesCard species={item} onClick={onCardClick} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};