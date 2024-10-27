import React from 'react'
import { useSelector } from 'react-redux'
import WaterPanel from '../components/WaterPanel';
import StepsPanel from '../components/StepsPanel';

const ItemContainer = () => {

    const item = useSelector(state => state.item.data);

    return (
        <div className='item_container'>
            <h2>{`Дата: ${new Date(item.date).toLocaleDateString()}`}</h2>
            {Object.keys(item).length > 0 && <WaterPanel item={item} />}
            {Object.keys(item).length > 0 && <StepsPanel item={item} />}
            <h3>{`Всего мл за день: ${item.water}`}</h3>
            <h3>{`Всего шагов за день: ${item.steps}`}</h3>
            <pre>
                {JSON.stringify(item, null, 2)}
            </pre>
        </div>
    )
}

export default ItemContainer