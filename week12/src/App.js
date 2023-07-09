import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Mypage from './pages/Mypage';

function App() {
  //Home Signup Mypage
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/mypage" element={<Mypage/>} />
      </Routes>
    </BrowserRouter>);
}

export default App;
