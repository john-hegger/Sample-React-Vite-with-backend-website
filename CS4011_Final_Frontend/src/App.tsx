import { Routes, Route } from 'react-router-dom';
import BlogPage from './pages/BlogPage';
import NewPost from './pages/NewPost';

const App: React.FC = () => {
    return (
        
        <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/new" element={<NewPost />} />
        </Routes>
        
    );
};

export default App;

