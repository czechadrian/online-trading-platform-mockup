import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Form} from "react-bootstrap";

const Login: React.FC = () => {
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {type, value} = e.target;
        setCredentials({...credentials, [type]: value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            console.log(credentials);
            // dummy jwt token
            const response = {data: {token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gVHJhZGVyIiwiaWF0IjoxNTE2MjM5MDIyfQ.AYPl1SZTtF1mxhZi28-RexyDvvgJiqGoiHP_suS4FO4"}};
            if (response.data && response.data.token) {

                localStorage.setItem('token', response.data.token);

                navigate('/overview');
            } else {
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <section className="d-flex justify-content-center align-items-center vh-100 vw-100">
            <div className="login-inner-element p-4 d-flex flex-column shadow-lg bg-white rounded" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Login</h2>
                <Form className="d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={handleChange} type="email" placeholder="Enter email" className="py-2"/>
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={handleChange} type="password" placeholder="Password" className="py-2"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="py-2 mb-3">
                        Sign in
                    </Button>
                    <div className="text-center">
                        <Form.Text className="text-muted">
                            {/*//TODO: link to be signed up to be added*/}
                            Don't have an account? <Link to={"/signup"}>Sign up</Link>
                        </Form.Text>
                    </div>
                </Form>
            </div>
        </section>
    );
};

export default Login;
