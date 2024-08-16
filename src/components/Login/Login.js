import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Form, InputGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { loginSuccess, loginFailure } from '../../redux/authSlice';
import './Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state) => state.auth.users);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            const user = users.find(
                (u) => u.email === values.email && u.password === values.password
            );

            if (user) {
                dispatch(loginSuccess(user));
                navigate('/dashboard');
            } else {
                dispatch(loginFailure());
                alert('Invalid login credentials');
            }
        },
    });

    return (
        <Container fluid className="login-container d-flex justify-content-center align-items-center">
            <Row className="w-100">
                <Col xs={12} md={8} lg={6} xl={4} className="mx-auto">
                    <div className="login-form-wrapper">
                        <h2>Login</h2>
                        <Form className="login-form" onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    id="email"
                                    type="email"
                                    name="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    isInvalid={formik.touched.email && !!formik.errors.email}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        isInvalid={formik.touched.password && !!formik.errors.password}
                                    />
                                    <InputGroup.Text
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </InputGroup.Text>
                                    {formik.touched.password && formik.errors.password && (
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.password}
                                        </Form.Control.Feedback>
                                    )}
                                </InputGroup>
                            </Form.Group>
                            <Button
                                type="submit"
                                className="submit-button"
                                disabled={!formik.isValid || !formik.dirty}
                            >
                                Login
                            </Button>
                        </Form>
                        <p className="register-link">
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
