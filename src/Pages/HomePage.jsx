import React from 'react'
import './css/HomePage.css'
import BanerBig from '../Components/BanerBig/BanerBig'
import Nowosci from '../Components/Nowosci/Nowosci'
import Rtv from '../Components/Rtv/Rtv'
import Agd from '../Components/Agd/Agd'
import Promocje from '../Components/Promocje/Promocje'

const HomePage = () => {
  return (
    <div className='home-page'>
      <BanerBig currentIndex={2} />
      <Nowosci />
      <Promocje />
      <Rtv />
      <Agd />
      </div>
  )
}

export default HomePage