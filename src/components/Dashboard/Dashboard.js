import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Form,
  Table,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

import { logout } from "../../redux/authSlice";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, currentUser } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({
    date: "",
    country: "",
    gender: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleApplyFilters = () => {
    setShowModal(false);
  };

  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== ""
  ).length;

  const filteredUsers = users.filter((user) => {
    return (
      (filters.date ? user.registrationDate === filters.date : true) &&
      (filters.country ? user.country === filters.country : true) &&
      (filters.gender ? user.gender === filters.gender : true)
    );
  });

  return (
    <Container fluid className="dashboard-container">
      <header className="dashboard-header d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 p-3 bg-light rounded shadow-sm">
        <h2 className="mb-3 mb-md-0">Dashboard</h2>
        <div className="d-flex flex-column flex-md-row align-items-center">
          <p className="welcome-text me-3 mb-2 mb-md-0">
            Welcome, {currentUser.firstName} ({currentUser.email})
          </p>
          <Button
            onClick={handleLogout}
            variant="danger"
            className="mt-2 mt-md-0 ml-md-3"
          >
            Logout
          </Button>
        </div>
      </header>

      <section className="filter-section mb-4 d-flex flex-column flex-md-row justify-content-between align-items-center p-3 bg-light rounded shadow-sm">
        <h3 className="mb-3 mb-md-0">Registered Users</h3>
        <div className="filter-button-wrapper">
          <Button
            variant="outline-primary"
            onClick={() => setShowModal(true)}
            className="d-flex align-items-center"
          >
            <FaFilter className="mr-2" />
            Filter
          </Button>
          {activeFilterCount > 0 && (
            <div className="filter-badge">{activeFilterCount}</div>
          )}
        </div>
      </section>

      <section className="user-table">
        <Table striped bordered hover responsive="sm" className="table-custom">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>Gender</th>
              <th>Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.gender}</td>
                  <td>{user.registrationDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </section>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filter Options</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col xs={12}>
                <Form.Group>
                  <Form.Label htmlFor="date">Filter by Date:</Form.Label>
                  <Form.Control
                    id="date"
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleFilterChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label htmlFor="country">Filter by Country:</Form.Label>
                  <Form.Control
                    id="country"
                    as="select"
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="USA">USA</option>
                    <option value="India">India</option>
                    <option value="Canada">Canada</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label htmlFor="gender">Filter by Gender:</Form.Label>
                  <Form.Control
                    id="gender"
                    as="select"
                    name="gender"
                    value={filters.gender}
                    onChange={handleFilterChange}
                  >
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
