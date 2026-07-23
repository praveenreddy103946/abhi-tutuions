import React, { useEffect } from 'react';
 import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
 import './styles/variables.css';
 import './App.css';


 import Navbar from './components/NavBar/Navbar';
 import Footer from './components/Footer/Footer';
 import Home from './pages/Home/Home';
 import About from './pages/About/About';
 import Admissions from './pages/Admissions/Admissions';
 import DemoTutorials from './pages/DemoTutorials/Demotutorials';
 import Registration from './pages/Registration/Registration';
import Admin from './pages/Admin/Admin';
//import Academics from './pages/Academics/Academics';
//import NewsEvents from './pages/NewsEvents/NewsEvents';
//import Gallery from './pages/Gallery/Gallery';
//import Contact from './pages/Contact/Contact';

function ScrollToTop() {
  const { pathname} = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
  <Router><ScrollToTop />
  <Navbar />
  <div className="app__page-wrap">
    <Routes><Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/admissions" element={<Admissions />} />
    <Route path="/demo-tutorials" element={<DemoTutorials />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/admin" element={<Admin />} />
    {/* <Route path="/academics" element={<Academics />} /> 
    <Route path="/news-events" element={<NewsEvents />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/contact" element={<Contact />} /> */}
  </Routes>
</div>
<Footer />
</Router>
  );
}