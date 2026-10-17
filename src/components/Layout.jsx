import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import GridOverlay from './GridOverlay.jsx'
import SiteHeader from './SiteHeader.jsx'
import TitleBlock from './TitleBlock.jsx'
import { sections } from '../data/sections.js'
import './Layout.css'

function Layout() {
  const { pathname } = useLocation()
  const current = sections.find((section) => pathname.startsWith(section.path))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="layout">
      <GridOverlay />
      <SiteHeader
        sheet={current ? `0${current.number}` : '000'}
        sheetTitle={current ? current.title : 'Index'}
      />
      <main className="layout__main">
        <Outlet />
      </main>
      <TitleBlock />
    </div>
  )
}

export default Layout
