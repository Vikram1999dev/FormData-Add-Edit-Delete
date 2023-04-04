import React from 'react';
import Test from './test';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Display from './display';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path='/' element={<Test />} />
          <Route path='/display' element={<Display />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
