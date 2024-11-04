import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import StackBar from '../components/StackBar';

const UserParametersContainer = () => {

  const userParameters = useSelector(state => state.userParameter.data);
  const waterParams = userParameters.filter(i => i.type === 'water').sort((a, b) => b.rating - a.rating);
  const stepsParams = userParameters.filter(i => i.type === 'steps').sort((a, b) => b.rating - a.rating);

  return (
    <div className='params_container'>
      <StackBar title={'Вода'} params={waterParams} />
      <StackBar title={'Шаги'} params={stepsParams} />
    </div>
  )
}

export default UserParametersContainer