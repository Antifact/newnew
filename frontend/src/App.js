import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ShowUsers from './pages/ShowUsers';
import Profile from './pages/Profile';
import CurrentProfile from './pages/currentProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' exact element={ <Home/> } />
        <Route path='/register' element={ <RegisterPage /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/users' element={ <ShowUsers /> } />
        <Route path='/users/:id' element={ <Profile /> } />
        <Route path='/users/me' element={ <CurrentProfile /> } />
      </Routes>
    </Router>
  );
}

export default App;