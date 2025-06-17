import React from 'react'
import LoadingPage from '../components/LoadingPage'
import Page3 from '../components/Page3'
import Page4 from '../components/Page4'
import Page5 from '../components/Page5'
import Page6 from '../components/Page6'
import Page7 from '../components/Page7'
import BrandEvents from './BrandEvents'

function Home() {
  return (
    <>
      <LoadingPage />
      <Page3 />  
      <Page4 />
      <BrandEvents />
      <Page7 />
      <Page5 />
      <Page6 />
    </>
  )
}

export default Home
