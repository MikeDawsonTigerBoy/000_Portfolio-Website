import { Navigate, Route, Routes } from 'react-router-dom'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Music from './pages/Music.jsx'
import Product from './pages/Product.jsx'
import ProjectPage from './pages/ProjectPage.jsx'
import SectionPage from './pages/SectionPage.jsx'
import { findSection, isPublished } from './data/sections.js'

// Hidden sections (Art, Music for the MVP) send visitors home instead.
const onlyIfPublished = (id, page) => (isPublished(findSection(id)) ? page : <Navigate to="/" replace />)

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="product/:number" element={<ProjectPage />} />
        <Route path="music" element={onlyIfPublished('music', <Music />)} />
        <Route path="art" element={onlyIfPublished('art', <SectionPage id="art" />)} />
        <Route path="about" element={<About />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<Blog />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
