import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import SectionPage from './pages/SectionPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product" element={<SectionPage id="product" />} />
        <Route path="music" element={<SectionPage id="music" />} />
        <Route path="art" element={<SectionPage id="art" />} />
        <Route path="about" element={<SectionPage id="about" />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
