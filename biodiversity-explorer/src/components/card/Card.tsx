export type CardProps = {
    imgUrl: string;
    title: string;
    summary: string;
    labels: string[];
    conservationActions: string;
    onSelect: () => void
}

const Card = ({ imgUrl, title, summary, labels, conservationActions, onSelect }: CardProps) => {
    return (
        <div role="button" className="flex flex-col w-auto min-h-[350px] bg-[var(--color-black)] cursor-pointer" onClick={() => onSelect()}>
            <div className="h-[50%] w-full"><img src={imgUrl} className="w-full h-full object-cover rounded-t-lg" alt={`Photo of ${title}`} /></div>
            <div className="h-[50%] w-full bg-[var(--color-card-green)] rounded-b-lg p-5">
                <h1 className="text-xl font-bold text-left">{title}</h1>
                <h3 className="text-lg line-clamp-3 overflow-ellipsis mb-2">{summary}</h3>
                <div className="flex items-center justify-start gap-2 flex-wrap">
                    {labels.map((label, id) => {
                        return (
                            <div key={id} className="rounded-sm bg-[var(--color-border-green)] px-1.5 py-0.5 text-center font-bold text-base text-[var(--color-white)]">
                                {label}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Card