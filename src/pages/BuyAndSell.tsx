import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {generateListOfStocksWithPrices} from "../helpers/stockHelpers";

const BuyAndSell = () => {
    const [balance, setBalance] = useState(100000);
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [transactionType, setTransactionType] = useState('buy');
    const [stocksWithPrices, setStocksWithPrices] = useState([]);

    const handleTransaction = () => {
        if (transactionType === 'buy') {
            const cost = parseFloat(symbol) * quantity;
            if (cost <= balance) {
                setBalance(balance - cost);
            } else {
                alert('Insufficient funds for the purchase.');
            }
        } else {
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setStocksWithPrices(stocksWithPrices.length > 0 ?
                generateListOfStocksWithPrices(stocksWithPrices.map(stock => stock.name)) :
                generateListOfStocksWithPrices());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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
                                        {stocksWithPrices.map(stock => <option>{stock.name}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                {symbol && (<Form.Group controlId="price">
                                    <Form.Label>Stock Price</Form.Label>
                                    <Form.Control
                                        disabled={true}
                                        type="text"
                                        value={stocksWithPrices.find(stock => stock.name = symbol).price}
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
