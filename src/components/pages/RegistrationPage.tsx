import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Form, Input, InputEmail, PasswordInput, RegLogInButton } from '../../styledComponents/StyledComponents';
import { auth, database } from '../../firebase/InitialFirebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { setDoc, doc } from '@firebase/firestore';
import { setUserNameAction } from '../../redux/creatorsActions/creatorsActions';
import { setIdUserAction } from '../../redux/creatorsActions/creatorsActions';

export default function Registration () {

    const dispatch = useDispatch();
    const history = useHistory();
    const [signUpParams, setSignUpParams] = useState({
        name: '',
        email: '',
        password: '',
        passwordRepeat: ''
    });
    console.log(signUpParams.email);

    const handlerChangeSignUdParams = ({target: {name, value}}: any) => {
        setSignUpParams({
            ...signUpParams,
            [name]: value
        });
    };
    
    const signIn = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        const {name, email, password, passwordRepeat} = signUpParams;

        if(password === passwordRepeat) {
            createUserWithEmailAndPassword(auth, email, password)
            .then(responce => { 
                if(responce.user.uid) {
                    setDoc(doc(database, `users`, `${responce.user.uid}`), {
                        userName: name,
                        userEmail: email,
                    });
                    dispatch(setUserNameAction(name));
                    dispatch(setIdUserAction(responce.user.uid));
                    history.push('/');
                } else {
                    alert('Don`t creaate new user in database!');
                }
                return responce;
            })
            .catch(error => alert(error)); 
        } else {
            alert('Paswords don`t match');
        }
    };

    return (
        <>
            <h1>Registration Page</h1>
            <Form>
                <Input placeholder="Your Name" name='name' onChange={handlerChangeSignUdParams} />
                <InputEmail placeholder="Your Email" name='email' onChange={handlerChangeSignUdParams} />
                <PasswordInput type='password' placeholder="Your Password" name='password' onChange={handlerChangeSignUdParams} />
                <PasswordInput type='password' placeholder="Repeat Your Password" name='passwordRepeat' onChange={handlerChangeSignUdParams} />
                <RegLogInButton onClick={signIn}>Register</RegLogInButton>
            </Form>
            <NavLink to='/'>LogIn</NavLink>
        </>
    );
}