import React, { useState } from 'react';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import Account from './components/Account';
import Join from './components/Join';
import ProtectedRoute from './contexts/ProtectedRoute';
import './App.css';

function App() {
    const [showJoin, setShowJoin] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const toggleJoin = () => setShowJoin(prev => !prev);
    const toggleAccount = () => setShowAccount(prev => !prev);

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
