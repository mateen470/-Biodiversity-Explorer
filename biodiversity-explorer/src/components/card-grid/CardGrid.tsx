import React from 'react';
import Card, { CardProps } from '../card/Card';
import LoadingSpinner from '../../utility/LoadingSpinner';

interface CardGridProps {
    items: CardProps[];
    onCardSelect: (item: CardProps) => void;
    loading?: boolean;
    error?: string | "Something went wrong!";
}

const CardGrid: React.FC<CardGridProps> = ({
    items,
    onCardSelect,
    loading,
    error,
}) => {
    if (loading) return <LoadingSpinner />;

    if (error) return <div className="text-red-500">\{error}</div>;

    return (
        <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {items.map(item => (
                <li key={item.title} role="listitem">
                    <Card
                        {...item}
                        onSelect={() => onCardSelect(item)}
                    />
                </li>
            ))}
        </ul>
    );
};

export default CardGrid;
