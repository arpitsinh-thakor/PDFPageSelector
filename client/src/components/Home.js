import React from 'react'
import Footer from './Footer'
import HomeContent from './HomeContent'

const Home = () => {
  return (
    <div className='bg-stone-400'>
      {/* //content goes here */}
      <HomeContent/>
      <Footer/>
    </div>
  )
}

export default Home