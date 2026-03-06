import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editItem } from '../reducers/item';

const QUICK_AMOUNTS = [180, 500, 1000];

const WaterPanel = ({ item }) => {

    const dispatch = useDispatch();
    const [water, setWater] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(
        () => { setWater(0); },
        [item.water]
    );

    const addWater = async (amount) => {
        setLoading(true);
        await dispatch(editItem({ uuid: item.uuid, water: Number(item.water) + Number(amount) }));
        setLoading(false);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!water || Number(water) === 0) return;
        await addWater(water);
    };

    return (
        <div className='water_panel'>
            <div className='panel_title'>💧 Добавить воду</div>
            <div className='water_quick_buttons'>
                {QUICK_AMOUNTS.map(amount => (
                    <button
                        key={amount}
                        className='btn btn_water'
                        onClick={() => addWater(amount)}
                        disabled={loading}
                    >
                        +{amount} мл
                    </button>
                ))}
            </div>
            <form className='water_custom_form' onSubmit={submitHandler}>
                <input
                    id='water_counter'
                    type="number"
                    value={water}
                    onChange={e => setWater(e.target.value)}
                    placeholder="Другое количество (мл)"
                    min={-9999}
                />
                <button
                    disabled={String(water) === '' || Number(water) === 0 || loading}
                    type="submit"
                    className='btn btn_primary'
                >
                    Сохранить
                </button>
            </form>
            <div className='current_total'>Итого за день: <strong>{item.water} мл</strong></div>
        </div>
    )
}

export default WaterPanel
