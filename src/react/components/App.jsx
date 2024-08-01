import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicationForm from './ApplicationForm';
import { Container, Alert, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Login from './Login';
import GoogleLoginButton from './GoogleLoginButton';
import './styles.css';

const AppContainer = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px; /* Adjust the gap to control padding between buttons */
`;

const CustomRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
`;

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status


    const handleLogout = async () => {
        await axios.get('https://lakshyag42.alwaysdata.net/logout');
        localStorage.setItem('userId', "0");
        setIsLoggedIn(false); // Log user out
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        console.log('Google login success:', credentialResponse);
        try {
            const response = await axios.post('https://lakshyag42.alwaysdata.net/auth/google', {
                tokenId: credentialResponse.credential,
            });
            console.log('Server response:', response.data);
            setIsLoggedIn(true); // Update login status in the client
            console.log('User ID:', response.data.userId);
            localStorage.setItem('userId', response.data.userId);
        } catch (error) {
            console.error('Error logging in with Google:', error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error('Google login error:', error);
        // Handle login failure (e.g., display error message)
    };

    return (
        <Container>
            {/* Conditional rendering based on isLoggedIn state */}
            {isLoggedIn ? (
                <>
                    <CustomRow>
                        <Col>
                            <h1>Internship Tracker</h1>
                        </Col>
                        <Col className="d-flex justify-content-end">
                            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
                        </Col>
                    </CustomRow>
                    <ApplicationForm setApplications={setApplications} />
                </>
            ) : (
                // <>
                // <Alert variant="danger">You are not logged in. Please log in to access the application.</Alert>
                // <ButtonContainer>
                //   <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} onFailure={handleGoogleLoginFailure} />
                // </ButtonContainer>        
                // </>              
                <Login onGoogleSuccess={handleGoogleLoginSuccess} onGoogleFailure={handleGoogleLoginFailure}/>
            )}
        </Container>
    );
};

export default App;
