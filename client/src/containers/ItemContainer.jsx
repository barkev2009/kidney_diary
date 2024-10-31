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
            <h3>{`Рейтинг воды: ${item.water_rating}`}</h3>
            <h3>{`Рейтинг шагов: ${item.steps_rating}`}</h3>
            <h3>{`Рейтинг общий: ${item.total_rating}`}</h3>
            <pre>
                {JSON.stringify(item, null, 2)}
            </pre>
        </div>
    )
}

export default ItemContainer