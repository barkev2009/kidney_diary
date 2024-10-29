import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createParam, setActive } from '../reducers/userParameter';

const UserParameterSlider = () => {

    const active = useSelector(state => state.userParameter.active);
    const user = useSelector(state => state.user.user);
    const userParameters = useSelector(state => state.userParameter.data);
    const dispatch = useDispatch();

    const [water_min, set_water_min] = useState(0);
    const [water_max, set_water_max] = useState(0);
    const [steps_min, set_steps_min] = useState(0);
    const [steps_max, set_steps_max] = useState(0);
    const [water_rating, set_water_rating] = useState(0);
    const [steps_rating, set_steps_rating] = useState(0);

    const submitHandler = (type) => {
        return (e) => {
            e.preventDefault();
            switch (type) {
                case 'water':
                    dispatch(createParam({ uuid: user.id, water_min, water_max, water_rating }));
                    set_water_min(0);
                    set_water_max(0);
                    set_water_rating(0);
                    break;
                case 'steps':
                    dispatch(createParam({ uuid: user.id, steps_min, steps_max, steps_rating }));
                    set_steps_min(0);
                    set_steps_max(0);
                    set_steps_rating(0);
                    break;
            }
        }
    }

    return (
        <div className={`slider_container ${active && 'active'}`}>
            <button onClick={() => dispatch(setActive())}>BACK</button>
            <form onSubmit={submitHandler('water')}>
                <div>
                    <div>water min</div>
                    <input type="number" value={water_min} onChange={e => set_water_min(e.target.value)} />
                </div>
                <div>
                    <div>water max</div>
                    <input type="number" value={water_max} onChange={e => set_water_max(e.target.value)} />
                </div>
                <div>
                    <div>water rating</div>
                    <input type="number" value={water_rating} onChange={e => set_water_rating(e.target.value)} />
                </div>
                <button type="submit">CREATE</button>
            </form>
            <pre>
                {JSON.stringify(userParameters, null, 2)}
            </pre>
        </div>
    )
}

export default UserParameterSlider