import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HabitTracker from './components/HabitTracker';
import SignIn from './components/SignIn';
import Videos from './components/Videos';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/HabitTracker" element={<HabitTracker />} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/Videos" element={<Videos />} />
      <Route path="/SignUp" element={<SignUp />} />
    </Routes>
  );
};

export default App;
