import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Hometemp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
