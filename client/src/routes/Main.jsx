import React from 'react'
import { useSetCookie } from '../hooks'

const Main = () => {

    useSetCookie();

    return (
        <div>Main</div>
    )
}

export default Main