// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListView from './components/ListView';
import GalleryView from './components/GalleryView';
import DetailView from './components/DetailView';
import Home from './components/Home'; 
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/mp2"> 
      <div className="App">
        <nav className="main-nav">
          <Link to="/list">Search</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/meal/:mealId" element={<DetailView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;