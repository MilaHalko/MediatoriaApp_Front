import React from 'react'

function RedBorderBlackButton({title, onClick, className}) {
    return (
        <button onClick={onClick}
                className={`${className} bg-main font-medium transitions active:bg-subMain border border-subMain text-white py-2 px-6 rounded`}>
            {title}
        </button>
    )
}

export default RedBorderBlackButton
