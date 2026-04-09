import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import DecorShapeSelect from './pages/DecorShapeSelect';
import DecorGallery from './pages/DecorGallery';
import PhotoFrameFlow from './pages/PhotoFrameFlow';
import NamePlateFlow from './pages/NamePlateFlow';

import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes with Main Layout */}
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/decor" element={<DecorShapeSelect />} />
                <Route path="/decor/:shape" element={<DecorGallery />} />
                <Route path="/photo-frame" element={<PhotoFrameFlow />} />
                <Route path="/name-plate" element={<NamePlateFlow />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;