import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const ApplicationForm = ({ setApplications }) => {
    const [role, setRole] = useState('');
    const [company, setCompany] = useState('');
    const [dateApplied, setDateApplied] = useState(new Date().toISOString().substr(0, 10)); 
    const [currentStatus, setCurrentStatus] = useState('Applied');
    const [userId] = useState(localStorage.getItem('userId'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://lakshyag42.alwaysdata.net/applications', 
                { role, company, dateApplied, currentStatus, user: userId },
                { params: { userId: localStorage.getItem('userId') } }
            );
            alert('Application successfully added');
            setRole('');
            setCompany('');
            setDateApplied(new Date().toISOString().substr(0, 10));
            setCurrentStatus('Applied');
            setApplications(prev => [...prev, { role, company, dateApplied, currentStatus }]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col sm={3}>
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="Role"
                            list="roleList"
                            required
                        />
                    </Col>
                    <Col sm={3}>
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company"
                            list="companyList"
                            required
                        />
                    </Col>
                    <Col sm={3}>
                        <Form.Label>Date Applied</Form.Label>
                        <Form.Control
                            type="date"
                            value={dateApplied}
                            onChange={(e) => setDateApplied(e.target.value)}
                            required
                        />
                    </Col>
                    <Col sm={3}>
                        <Form.Label>Current Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={currentStatus}
                            onChange={(e) => setCurrentStatus(e.target.value)}
                            required
                        >
                            <option value="Applied">Applied</option>
                            <option value="Online Assessment">Online Assessment</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Interviewed">Interviewed</option>
                            <option value="Offer Received">Offer Received</option>
                            <option value="Offer Accepted">Offer Accepted</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Control>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end mt-2">
                        <Button className="d-flex justify-content-end mt-2" variant="primary" type="submit">
                            Add Application
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default ApplicationForm;
