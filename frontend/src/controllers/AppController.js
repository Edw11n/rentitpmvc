import { useState } from 'react';

const AppController = () => {
    const [showJoin, setShowJoin] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const toggleJoin = () => setShowJoin(prev => !prev);
    const toggleAccount = () => setShowAccount(prev => !prev);

    return {
        showJoin,
        showAccount,
        toggleJoin,
        toggleAccount,
    };
};

export default AppController;
