import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Hometemp';
import Dashboard from './pages/Dashboard';
import BookmarkRepo from './pages/bookmark';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Dashboard />} />
        <Route path="/bookmark" element={<BookmarkRepo />} />
      </Routes>
    </Router>
  );
}

export default App;
