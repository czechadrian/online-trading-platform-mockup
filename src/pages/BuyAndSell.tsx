import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {generateListOfStocksWithPrices} from "../helpers/stockHelpers";
import {usePortfolio} from "../context/PortfolioContext";

const BuyAndSell = () => {
    const {balance, setBalance, portfolio, setPortfolio} = usePortfolio();

    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [transactionType, setTransactionType] = useState('buy');
    const [stocksWithPrices, setStocksWithPrices] = useState([]);

    const handleTransaction = () => {
        if (transactionType === 'buy') {
            const cost = stocksWithPrices.find(stock => stock.name === symbol).price * quantity;
            if (cost <= balance) {
                setBalance(balance - cost);
                setPortfolio(portfolio.find(stock => stock.name === symbol) ?
                    portfolio.map(p => p.name === symbol ? {...p, quantity: quantity + p.quantity} : p) :
                    [...portfolio, {name: symbol, quantity}]);
            } else {
                alert('Insufficient funds for the purchase.');
            }
        } else if (portfolio.find(stock => stock.name === symbol)) {
            if (portfolio.find(stock => stock.name === symbol && stock.quantity < quantity)) {
                alert("You don't have that many stocks.")
            } else {
                const profit = stocksWithPrices.find(stock => stock.name === symbol).price * quantity;
                setBalance(balance + profit);
                setPortfolio(portfolio.map(p => p.name === symbol ? {...p, quantity: p.quantity - quantity} : p));
            }
        }
    };

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
        <Container className={'d-flex flex-column min-vw-100'}>
            <h2>Buy and Sell Assets</h2>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <h4>Your Balance: ${balance.toFixed(2)}</h4>
                            <Form>
                                <Form.Group controlId="symbol">
                                    <Form.Label>Stock Symbol</Form.Label>
                                    <Form.Control
                                        as="select"
                                        placeholder="Choose stock symbol"
                                        value={symbol}
                                        onChange={(e) => setSymbol(e.target.value)}
                                    >
                                        <option>Select stock symbol</option>
                                        {stocksWithPrices.map(stock => <option key={stock.name}>{stock.name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                {symbol && (<Form.Group controlId="price">
                                    <Form.Label>Stock Price</Form.Label>
                                    <Form.Control
                                        disabled={true}
                                        type="text"
                                        value={stocksWithPrices.find(stock => stock.name === symbol).price}
                                    />
                                </Form.Group>)}
                                <Form.Group controlId="quantity">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="10"
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                    />
                                </Form.Group>
                                <Form.Group controlId="transactionType">
                                    <Form.Label>Transaction Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={transactionType}
                                        onChange={(e) => setTransactionType(e.target.value)}
                                    >
                                        <option value="buy">Buy</option>
                                        <option value="sell">Sell</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary mt-4" onClick={handleTransaction}>
                                    Execute Transaction
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BuyAndSell;
