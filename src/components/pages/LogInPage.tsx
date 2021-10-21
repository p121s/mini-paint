import { signInWithEmailAndPassword } from '@firebase/auth';
import { getDoc, doc } from '@firebase/firestore';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth, database } from '../../firebase/InitialFirebase';
import { Button, Form, InputEmail, PasswordInput } from '../../styledComponents/StyledComponents';
import { SET_NAME, SET_ID_USER } from '../../constants/actionsConctants';

export default function LogIn () {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handlerChangeEmail = ({target: {value}}: any) => {
        setEmail(value);
    };

    const handlerChangePassword = ({target: {value}}: any) => {
        setPassword(value);
    };

    const signIn = (e: any) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then(responce => responce.user.uid)
                .then(id => {
                    getDoc(doc(database, 'users', `${id}`))
                        .then(responce => responce!.data()!.userName)
                        .then(name => {
                    dispatch({type: SET_NAME, payload: `${name}`});
                    })
                    dispatch({type: SET_ID_USER, payload: id});
                })
            .catch(error => alert(error)); 
    };

    return (
        <>
            <h1>Log In Page</h1>
            <Form>
                <InputEmail placeholder='Your Email' onChange={handlerChangeEmail} />
                <PasswordInput type='password' placeholder="Your Password" onChange={handlerChangePassword} />
                <Button onClick={signIn}>Sign In</Button>
                
            </Form>
            <NavLink to='/register'>Registration</NavLink>
        </>
    );
}