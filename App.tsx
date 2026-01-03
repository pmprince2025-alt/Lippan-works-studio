import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import DecorShapeSelect from './pages/DecorShapeSelect';
import DecorGallery from './pages/DecorGallery';
import PhotoFrameFlow from './pages/PhotoFrameFlow';
import NamePlateFlow from './pages/NamePlateFlow';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decor" element={<DecorShapeSelect />} />
          <Route path="/decor/:shape" element={<DecorGallery />} />
          <Route path="/photo-frame" element={<PhotoFrameFlow />} />
          <Route path="/name-plate" element={<NamePlateFlow />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;