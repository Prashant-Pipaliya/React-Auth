import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { registerUser } from '../../redux/authSlice';
import './Register.css';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            country: '',
            gender: '',
            phoneNumber: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().min(1, 'Must be at least 1 character').required('Required'),
            lastName: Yup.string().min(1, 'Must be at least 1 character').required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            address: Yup.string().required('Required'),
            country: Yup.string().required('Required'),
            gender: Yup.string().required('Required'),
            phoneNumber: Yup.string().matches(/^[0-9]{10}$/, 'Must be a valid phone number').required('Required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        }),
        onSubmit: (values) => {
            const user = {
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                address: values.address,
                country: values.country,
                gender: values.gender,
                phoneNumber: values.phoneNumber,
                password: values.password,
                registrationDate: new Date().toISOString().split('T')[0],
            };
            dispatch(registerUser(user));
            alert('Registration successful');
            navigate('/login');
        },
    });

    return (
        <Container fluid className="register-container d-flex justify-content-center align-items-center">
            <Row className="w-100">
                <Col xs={12} md={8} lg={6} xl={4} className="mx-auto">
                    <div className="register-form-wrapper">
                        <h2>Register</h2>
                        <Form className="register-form" onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="firstName">First Name</Form.Label>
                                <Form.Control
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.firstName}
                                    isInvalid={formik.touched.firstName && !!formik.errors.firstName}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.firstName}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="lastName">Last Name</Form.Label>
                                <Form.Control
                                    id="lastName"
                                    type="text"
                                    name="lastName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.lastName}
                                    isInvalid={formik.touched.lastName && !!formik.errors.lastName}
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.lastName}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="email">Email</Form.Label>
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
                                <Form.Label htmlFor="address">Address</Form.Label>
                                <Form.Control
                                    id="address"
                                    as="textarea"
                                    name="address"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                    isInvalid={formik.touched.address && !!formik.errors.address}
                                />
                                {formik.touched.address && formik.errors.address && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.address}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="country">Country</Form.Label>
                                <Form.Control
                                    id="country"
                                    as="select"
                                    name="country"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.country}
                                    isInvalid={formik.touched.country && !!formik.errors.country}
                                >
                                    <option value="">Select Country</option>
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                    <option value="UK">UK</option>
                                </Form.Control>
                                {formik.touched.country && formik.errors.country && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.country}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        name="gender"
                                        value="male"
                                        label="Male"
                                        onChange={formik.handleChange}
                                        checked={formik.values.gender === 'male'}
                                        className="me-1"
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="gender"
                                        value="female"
                                        label="Female"
                                        onChange={formik.handleChange}
                                        checked={formik.values.gender === 'female'}
                                        className="me-1"
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="gender"
                                        value="other"
                                        label="Other"
                                        onChange={formik.handleChange}
                                        checked={formik.values.gender === 'other'}
                                        className="me-1"
                                    />
                                </div>
                                {formik.touched.gender && formik.errors.gender && (
                                    <div className="error-message">{formik.errors.gender}</div>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                                <Form.Control
                                    id="phoneNumber"
                                    type="text"
                                    name="phoneNumber"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.phoneNumber}
                                    isInvalid={formik.touched.phoneNumber && !!formik.errors.phoneNumber}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.phoneNumber}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="password">Password</Form.Label>
                                <Form.Control
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    isInvalid={formik.touched.password && !!formik.errors.password}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.password}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                                <Form.Control
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirmPassword}
                                    isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.confirmPassword}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>

                            <Button
                                type="submit"
                                className="submit-button"
                                disabled={!formik.isValid || !formik.dirty}
                            >
                                Register
                            </Button>
                        </Form>
                        <p className="login-link">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
