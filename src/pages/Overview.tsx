import React from 'react';
import {usePortfolio} from "../context/PortfolioContext";
import {Col, Container, Row, Table} from "react-bootstrap";

const Overview: React.FC = () => {
    const {balance, portfolio, stocksWithPrices} = usePortfolio();


    const valueInStock = (item: { quantity: number, name: string }) => (item.quantity * stocksWithPrices.find(stock => stock.name === item.name).price).toFixed(2);
    const balanceInStocks = () => portfolio.reduce(function(res, stock) {
         res = stocksWithPrices.find(s => s.name === stock.name).price * stock.quantity;
         return res & res;
    }, 0);
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 min-vw-100">
            <div className="m-5 p-5 d-flex flex-column shadow bg-light rounded"
                 style={{minWidth: '75vw', minHeight: '75vh'}}>

                <Row className="mb-4">
                    <Col>
                        <h2 className="mb-3">Portfolio Overview</h2>
                        <p className="font-weight-bold">Available cash:
                            ${balance}</p>
                        <p>Total: ${balance + balanceInStocks()}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <div className="table-responsive">
                            <Table striped bordered hover>
                                <thead className="thead-light">
                                <tr>
                                    <th>Asset</th>
                                    <th>Quantity</th>
                                    <th>Value in stock</th>
                                </tr>
                                </thead>
                                <tbody>
                                {portfolio.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>${valueInStock(item)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>

    );
};

export default Overview;