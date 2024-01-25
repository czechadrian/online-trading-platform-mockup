import React, {useEffect} from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {generateListOfStocksWithPrices} from "../helpers/stockHelpers";
import {usePortfolio} from "../context/PortfolioContext";

function Header(): React.FC {
    const navigate = useNavigate();

    const {stocksWithPrices, setStocksWithPrices} = usePortfolio();

    useEffect(() => {
        if (stocksWithPrices.length === 0)
            setStocksWithPrices(generateListOfStocksWithPrices());
        else {
            const interval = setInterval(() => {
                setStocksWithPrices(generateListOfStocksWithPrices(stocksWithPrices.map(stock => stock.name)));
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [stocksWithPrices]);
    
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">My Portfolio</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => navigate('/overview')}>Overview</Nav.Link>
                        <Nav.Link onClick={()=> navigate('/transactions')}>Transactions</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
