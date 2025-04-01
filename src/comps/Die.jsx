export default function Die(props) {
    return (
        <button className={props.className} id={props.id} onClick={props.onClick}>
            {props.value}
        </button>
    )
}