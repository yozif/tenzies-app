import * as React from 'react'

export default function Die({className, id, onClick, value}) {
    return (
        <button className={className} id={id} onClick={onClick} data-testid="die">
            {value}
        </button>
    )
}