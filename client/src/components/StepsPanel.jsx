import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editItem } from '../reducers/item';

const StepsPanel = ({ item }) => {

    const dispatch = useDispatch();
    const [steps, setSteps] = useState(item.steps);
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (String(steps) === '' || Number(steps) === Number(item.steps)) return;
        setLoading(true);
        dispatch(editItem({ uuid: item.uuid, steps }));
        setLoading(false);
    };

    return (
        <div className='steps_panel'>
            <div className='panel_title'>🚶 Шаги</div>
            <form className='steps_form' onSubmit={submitHandler}>
                <input
                    type="number"
                    value={steps}
                    onChange={e => setSteps(e.target.value)}
                    placeholder="Количество шагов"
                    min={0}
                />
                <button
                    disabled={String(steps) === '' || Number(steps) === Number(item.steps) || loading}
                    type="submit"
                    className='btn btn_primary'
                >
                    {loading ? 'Сохранение...' : 'Сохранить'}
                </button>
            </form>
            <div className='current_total'>Текущее значение: <strong>{item.steps} шагов</strong></div>
        </div>
    )
}

export default StepsPanel