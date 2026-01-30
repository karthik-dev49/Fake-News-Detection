import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Introduction} from './pages/Introduction';
import { Home } from './pages/Home';
import { Auth } from './pages/Auth';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Introduction />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

