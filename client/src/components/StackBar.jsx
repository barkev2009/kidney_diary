import React from 'react'

const StackBar = ({ params, title }) => {

    const style = (p) => ({
        backgroundColor: `hsl(${(p.rating) / Math.max(...params.map(i => i.rating)) * 100}deg 50% 40%)`,
        height: `${100 / params.length}%`
    })

    return (
        <div className="stack_bar_container">
            <div className="bar_label">{title}</div>
            <div className='stack_bar'>
                {
                    params.map(
                        p =>
                            <div key={p.uuid} style={style(p)} className="stack_block">
                                <div>{`${p.limit_min ? p.limit_min : '-∞'} - ${p.limit_max ? p.limit_max : '∞'}`}</div>
                            </div>
                    )
                }
            </div>
        </div>

    )
}

export default StackBar