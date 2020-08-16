import React, { useState } from 'react'
import { Form } from '../common-style/common-style';
import { SignInButton } from './styled-signin';
import { auth } from '../../firebase/firebase';

const SignInComponent = () => {
    const [info, setInfo] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = info;
        try {
            await auth.signInWithEmailAndPassword(email, password);
            setInfo({ email: '', password: '' });
        }catch (e) {
            alert(e);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInfo({
            ...info,
            [name]: value
        });
    }

    return (
        <Form>
            <p>Signin</p>
            <input 
              type="email" 
              placeholder='email' 
              name='email' 
              value={info.email} 
              onChange={handleChange}/>
            <input 
              type="password" 
              placeholder='password' 
              name='password' 
              value={info.password} 
              onChange={handleChange}/>
            <SignInButton type="submit" onClick={handleSubmit}>Sign In With Email And Password</SignInButton>
        </Form>
    )
};

export default SignInComponent;