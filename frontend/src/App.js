import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/pages/Home';
import Signup from './views/pages/Signup';
import Login from './views/pages/Login';
import Dashboard from './views/pages/Dashboard';
import Navbar from './views/components/Navbar';
import Account from './views/components/Account';
import Join from './views/components/Join';
import ProtectedRoute from './contexts/ProtectedRoute';
import AppController from './controllers/AppController';
import './App.css';

function App() {
    const {
        showJoin,
        showAccount,
        toggleJoin,
        toggleAccount,
    } = AppController(); // Utiliza el controlador

    return (
        <UserProvider>
            <Router>
                <Navbar 
                    goToJoin={toggleJoin} // Cambia a la función de controlador
                    showAccount={showAccount}
                    setShowAccount={toggleAccount} // Cambia a la función de controlador
                />
                {showJoin && <Join onClose={toggleJoin} />}
                {showAccount && <Account onClose={toggleAccount} />}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
