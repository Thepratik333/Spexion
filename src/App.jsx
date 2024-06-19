import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import Protected from './Protected';
import Navbar from './components/common/Navbar';
import Home from './components/common/Home';
import Login from './components/view/Login';
import Signup from './components/view/Signup';
import MyPost from './components/view/MyPost';
import Article from './components/view/AddArticle';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-articles" element={<Protected><MyPost /></Protected>} />
        <Route path="/article" element={<Protected><Article /></Protected>} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='*' element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
