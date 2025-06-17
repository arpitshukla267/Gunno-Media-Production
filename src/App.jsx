import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './components/Home'
import ContactUs from './components/ContactUs'
import LoadingPage from './components/LoadingPage'
import Page2 from './components/Page2'
import Page3 from './components/Page3'
import Page4 from './components/Page4'
import Page5 from './components/Page5'
import Page6 from './components/Page6'
import Page7 from './components/Page7'
import BrandEvents from './components/BrandEvents'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/loading" element={<Home />} />
        <Route path='/About' element={<Page2 />} />
        <Route path="/Work" element={<> <Page3 /> <Page4 /> <BrandEvents /> <Page7 /> </>} />         
      </Route>
    </Routes>
  )
}

export default App
