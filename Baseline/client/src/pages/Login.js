import React from 'react';
import AuthForm from '../components/AuthForm/AuthForm'

function Login(props) {
    return (
        <div>
            <AuthForm login={true}/>
        </div>
    );
}

export default Login;