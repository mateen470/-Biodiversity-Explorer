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
        <div role="button" className="rounded-lg flex flex-col w-[350px] h-[350px] bg-[var(--color-black)] cursor-pointer" onClick={() => onSelect()}>
            <div className="h-[60%] w-full"><img src={imgUrl} className="w-full h-full object-cover" alt={`Photo of ${title}`} /></div>
            <div className="h-[40%] w-full bg-[var(--color-card-green)]">
                <h1 className="text-xl font-bold text-left">{title}</h1>
                <h3 className="text-lg text-balance line-clamp-2 overflow-ellipsis">{summary}</h3>
                <div className="flex items-center justify-start gap-2 flex-wrap">
                    {labels.map((label, id) => {
                        return (
                            <div key={id} className="rounded-sm bg-[var(--color-border-green)] px-1 py-0.5 text-center font-bold text-base text-[var(--color-white)]">
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