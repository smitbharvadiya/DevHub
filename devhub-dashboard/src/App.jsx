import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Hometemp';
import Dashboard from './pages/Dashboard';
import BookmarkRepo from './pages/bookmark';
import FolderRepoList from './pages/FolderRepoList';
import NotFound from './components/notFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:username" element={<Dashboard />} />
        <Route path="/bookmark" element={<BookmarkRepo />} />
        <Route path="/bookmark/:folderId" element={<FolderRepoList/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
