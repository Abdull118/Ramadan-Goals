import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import UserProvider from './contexts/UserProvider';

import Dashboard from './pages/Dashboard';
import DhikrCounter from './pages/Dhikr Counter';
import Main from './pages/Main';
import TaskTracker from './pages/Task Tracker';

const App = () => {
  return (
    <BrowserRouter>
      
        <Route path="/" exact component={Dashboard} />
        <Route path="/main" exact component={Main} />
        <Route path='/dhikrCounter' exact component ={DhikrCounter} />
        <Route path='/taskTracker' exact component ={TaskTracker} />
    </BrowserRouter>
  );
};

export default App;
