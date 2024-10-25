import React, { useState } from 'react';
import { useSetCookie } from '../hooks';
import { WEEKDAYS } from '../constants';
import Slider from '../components/Slider';

const Main = () => {

    useSetCookie();
    const [active, setActive] = useState(false);
    const sliderToggler = () => {
        setActive(prev => !prev)
    }

    return (
        <div className='main_container'>
            <div className="weekdays">
                {['  ', ...WEEKDAYS].map(d => <span key={d}>{d}</span>)}
            </div>
            <Slider active={active} sliderToggler={sliderToggler} />
            <div className='tile_container'>
                {[...Array(100).keys()].map(i => <div key={i} className='tile_row'>
                    {
                        [...Array(7).keys()].map(tile => <div onClick={sliderToggler} key={tile} className='tile'>{tile}</div>)
                    }
                </div>)}
            </div>
        </div>
    )
}

export default Main