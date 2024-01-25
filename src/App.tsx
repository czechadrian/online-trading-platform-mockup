import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';

import Login from './pages/Login';
import BuyAndSell from './pages/BuyAndSell';
import Overview from './pages/Overview';

const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Routes>
            <Route path="/" component={isAuthenticated ? <Login /> : <Overview />}>
                <Route path="login" element={<Login />} />
                <Route path="overview" element={<Overview />} />
                <Route path="transactions" element={<BuyAndSell />} />

                <Route path="*" element={<NoMatch />} />
            </Route>
        </Routes>
    );
};

function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}

export default App;
