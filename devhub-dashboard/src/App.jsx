import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Hometemp';
import Dashboard from './pages/Dashboard';
import BookmarkRepo from './pages/bookmark';
import FolderRepoList from './pages/FolderRepoList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Dashboard />} />
        <Route path="/bookmark" element={<BookmarkRepo />} />
        <Route path="/bookmark/:folderId" element={<FolderRepoList/>} />
      </Routes>
    </Router>
  );
}

export default App;
