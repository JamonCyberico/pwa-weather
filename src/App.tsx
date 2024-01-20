import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link  } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <div className='App'>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
