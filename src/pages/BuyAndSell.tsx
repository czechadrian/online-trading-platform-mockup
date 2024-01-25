import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {generateListOfStocksWithPrices} from "../helpers/stockHelpers";
import {usePortfolio} from "../context/PortfolioContext";

const BuyAndSell = () => {
    const {balance, setBalance, portfolio, setPortfolio, stocksWithPrices } = usePortfolio();

    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [transactionType, setTransactionType] = useState('buy');

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

    const costOfTransaction = () => (quantity * stocksWithPrices.find(stock => stock.name === symbol)?.price).toFixed(2);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 min-vw-100">
            <div className="m-5 p-5 d-flex flex-column shadow bg-light rounded" style={{ minWidth: '75vw', minHeight: '75vh' }}>
                <h2 className="text-center mb-4">Buy and Sell Assets</h2>
                <Row className="d-flex justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="border-0">
                            <Card.Header className="d-flex justify-content-center bg-primary text-white">Transaction Details</Card.Header>
                            <Card.Body>
                                <h4 className="mb-3">Your Balance: ${balance.toFixed(2)}</h4>
                                <Form>
                                    <Form.Group controlId="symbol" className="mb-3">
                                        <Form.Label>Stock Symbol</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="form-select"
                                            value={symbol}
                                            onChange={(e) => setSymbol(e.target.value)}
                                        >
                                            <option>Select stock symbol</option>
                                            {stocksWithPrices.map(stock => (
                                                <option key={stock.name} value={stock.name}>{stock.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    {symbol && (
                                        <Form.Group controlId="price" className="mb-3">
                                            <Form.Label>Stock Price</Form.Label>
                                            <Form.Control
                                                disabled
                                                type="text"
                                                className="form-control-plaintext"
                                                value={stocksWithPrices.find(stock => stock.name === symbol).price}
                                            />
                                        </Form.Group>
                                    )}
                                    <Form.Group controlId="quantity" className="mb-3">
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            type="number"
                                            className="form-control"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                                        />
                                    </Form.Group>
                                    {portfolio.find(stock => stock.name === symbol) && portfolio.find(stock => stock.name === symbol).quantity ? (<Form.Group controlId="quantityOfAcquiredStocks" className="mb-3">
                                        <Form.Label>Bought Stocks</Form.Label>
                                        <Form.Control
                                            type="number"
                                            className="form-control"
                                            value={portfolio.find(stock => stock.name === symbol).quantity}
                                            disabled={true}
                                        />
                                    </Form.Group>) : <></>}
                                    <Form.Group controlId="Cost" className="mb-3">
                                        <Form.Label>Cost</Form.Label>
                                        <Form.Control
                                            type="number"
                                            className="form-control"
                                            value={costOfTransaction()}
                                            disabled={true}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="transactionType" className="mb-3">
                                        <Form.Label>Transaction Type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            className="form-select"
                                            value={transactionType}
                                            onChange={(e) => setTransactionType(e.target.value)}
                                        >
                                            <option value="buy">Buy</option>
                                            <option value="sell">Sell</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button
                                        variant={transactionType === 'buy' ? costOfTransaction() > balance ? 'disabled' : 'success' : 'danger'}
                                        className="w-100"
                                        onClick={handleTransaction}
                                        disabled={transactionType === 'buy' && costOfTransaction() > balance}
                                    >
                                        {transactionType === 'buy' ? costOfTransaction() > balance ? 'Insufficient funds for the purchase.' : "Buy" : "Sell"}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Container>

    );
};

export default BuyAndSell;
