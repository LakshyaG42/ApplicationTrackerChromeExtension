import React, { useEffect } from 'react';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
    useEffect(() => {
        const loadScript = (src, callback) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = callback;
            document.head.appendChild(script);
        };

        loadScript('https://accounts.google.com/gsi/client', () => {
            window.google.accounts.id.initialize({
                client_id: 'YOUR_GOOGLE_CLIENT_ID',
                callback: (response) => {
                    if (response.credential) {
                        onSuccess(response);
                    } else {
                        onFailure('No credential received');
                    }
                }
            });
            window.google.accounts.id.renderButton(
                document.getElementById('signInDiv'),
                { theme: 'outline', size: 'large' }
            );
            window.google.accounts.id.prompt();
        });
    }, [onSuccess, onFailure]);

    return <div id="signInDiv"></div>;
};

export default GoogleLoginButton;
