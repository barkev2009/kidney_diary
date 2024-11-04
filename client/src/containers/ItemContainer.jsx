import React from 'react'
import { useSelector } from 'react-redux'
import WaterPanel from '../components/WaterPanel';
import StepsPanel from '../components/StepsPanel';

const ItemContainer = () => {

    const item = useSelector(state => state.item.data);
    const userParameters = useSelector(state => state.userParameter.data);
    const maxWater = Math.max(...userParameters.filter(i => i.type === 'water').map(i => i.limit_max));
    const maxSteps = Math.max(...userParameters.filter(i => i.type === 'steps').map(i => i.limit_max));
    const waterHeight = Math.min(item.water / maxWater * 100, 100);
    const stepsHeight = Math.min(item.steps / maxSteps * 100, 100);

    return (
        <div className='item_container'>
            <h2>{`Дата: ${new Date(item.date).toLocaleDateString()}`}</h2>
            {Object.keys(item).length > 0 && <WaterPanel item={item} />}
            {Object.keys(item).length > 0 && <StepsPanel item={item} />}
            <div className='ratings'>
                <div className='rating_container water'>
                    <div className="rating_bar">
                        <div style={{ height: `${waterHeight}%` }} className="rating_block">
                            {waterHeight > 10 && <div>{`${item.water} мл`}</div>}
                        </div>
                    </div>
                    <div className="rating_title">{`Вода: ${item.water_rating}`}</div>
                </div>
                <div className='rating_container steps'>
                    <div className="rating_bar">
                        <div style={{ height: `${stepsHeight}%` }} className="rating_block">
                            {stepsHeight > 10 && <div>{`${item.steps} шагов`}</div>}
                        </div>
                    </div>
                    <div className="rating_title">{`Расстояние: ${item.steps_rating}`}</div>
                </div>
            </div>
        </div>
    )
}

export default ItemContainer