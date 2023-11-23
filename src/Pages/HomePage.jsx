import React from 'react'
import './css/HomePage.css'
import BanerBig from '../Components/BanerBig/BanerBig'
import Nowosci from '../Components/Nowosci/Nowosci'

const HomePage = () => {
  return (
    <div className='home-page'>
      <BanerBig />
      <Nowosci />
      </div>
  )
}

export default HomePage