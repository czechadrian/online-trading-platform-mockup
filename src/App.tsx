import React from 'react';
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';


import Login from './pages/Login';
import BuyAndSell from './pages/BuyAndSell';
import Overview from './pages/Overview';
import {PortfolioProvider} from "./context/PortfolioContext";
import Header from "./components/Header";

const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    const Layout = ({children}) => {
        const location = useLocation();
        const showHeader = location.pathname !== '/login';

        return (
            <>
                {showHeader && <Header/>}
                <div>{children}</div>
            </>
        );
    };


    return (
        <PortfolioProvider>
            <Router>
                <Routes>
                    <Route path="/" component={isAuthenticated ? <Login/> : <Layout><Overview/></Layout>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="overview" element={<Layout><Overview/></Layout>}/>
                        <Route path="transactions" element={<Layout><BuyAndSell/></Layout>}/>

                        <Route path="*" element={<NoMatch/>}/>
                    </Route>
                </Routes>
            </Router>
        </PortfolioProvider>
    );
};

function NoMatch(): React.FC {
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
