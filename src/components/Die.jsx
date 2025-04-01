export default function Die({className, id, onClick, value}) {
    return (
        <button className={className} id={id} onClick={onClick}>
            {value}
        </button>
    )
}