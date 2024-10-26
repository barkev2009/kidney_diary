import React from 'react'
import { useSelector } from 'react-redux'

const ItemContainer = () => {

    const item = useSelector(state => state.item.data);

    return (
        <div className='item_container'>
            <h2>{`Дата: ${new Date(item.date).toLocaleDateString()}`}</h2>
            <pre>
                {JSON.stringify(item, null, 2)}
            </pre>
        </div>
    )
}

export default ItemContainer