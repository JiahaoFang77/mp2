// src/App.tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListView from './components/ListView';
import GalleryView from './components/GalleryView';
import DetailView from './components/DetailView';
import './App.css'; // Make sure you have this to apply some basic styles

function App() {
  return (
    <BrowserRouter basename="/mp2"> 
      <div className="App">
        {/* Simple Navigation Header */}
        <nav className="main-nav">
          <Link to="/list">Search View</Link>
          <Link to="/gallery">Gallery View</Link>
        </nav>
        
        <Routes>
          <Route path="/list" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/meal/:mealId" element={<DetailView />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;