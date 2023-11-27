import React from 'react'
import './css/HomePage.css'
import BanerBig from '../Components/BanerBig/BanerBig'
import Nowosci from '../Components/Nowosci/Nowosci'
import Rtv from '../Components/Rtv/Rtv'

const HomePage = () => {
  return (
    <div className='home-page'>
      <BanerBig />
      <Nowosci />
      <Rtv />
      </div>
  )
}

export default HomePage