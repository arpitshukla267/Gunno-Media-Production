import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop' // 👈 make sure path is correct

function Layout() {
  return (
    <>
      <ScrollToTop /> {/* 👈 This enables scrolling to top on route change */}
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
