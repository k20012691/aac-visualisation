import './App.css';
import HomeScreen from './components/HomeScreen';
import Analytics from './components/Analytics'

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/aac-visualisation' element={<HomeScreen />} />
        <Route path='/aac-visualisation/analytics' element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
