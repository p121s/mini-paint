import { signInWithEmailAndPassword } from '@firebase/auth';
import { getDoc, doc } from '@firebase/firestore';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth, database } from '../../firebase/InitialFirebase';
import { RegLogInButton, Form, InputEmail, PasswordInput } from '../../styledComponents/StyledComponents';
import { setUserNameAction } from '../../redux/creatorsActions/setUserNameAction';
import { setIdUserAction } from '../../redux/creatorsActions/setIdUserAction';

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
                    dispatch(setUserNameAction(`${name}`));
                    })
                    dispatch(setIdUserAction(id));
                })
            .catch(error => alert(error)); 
    };

    return (
        <>
            <h1>Log In Page</h1>
            <Form>
                <InputEmail placeholder='Your Email' onChange={handlerChangeEmail} />
                <PasswordInput type='password' placeholder="Your Password" onChange={handlerChangePassword} />
                <RegLogInButton onClick={signIn}>Sign In</RegLogInButton>
                
            </Form>
            <NavLink to='/register'>Registration</NavLink>
        </>
    );
}