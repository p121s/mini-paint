import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Button, Form, Input, InputEmail, PasswordInput } from '../../styledComponents/StyledComponents';
import { auth, database } from '../../firebase/InitialFirebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { setDoc, doc } from '@firebase/firestore';
import { setUserNameAction } from '../../redux/creatorsActions/setUserNameAction';
import { setIdUserAction } from '../../redux/creatorsActions/setIdUserAction';

export default function Registration () {

    const dispatch = useDispatch();
    const history = useHistory()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const handlerChangeName = ({target: {value}}: any) => {
        setName(value);
    };

    const handlerChangeEmail = ({target: {value}}: any) => {
        setEmail(value);
    };

    const handlerChangePassword = ({target: {value}}: any) => {
            setPassword(value);
    };

    const handlerChangePasswordRepeat = ({target: {value}}: any) => {
        setPasswordRepeat(value);
    };

    const signIn = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

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
                <Input placeholder="Your Name" onChange={handlerChangeName} />
                <InputEmail placeholder="Your Email" onChange={handlerChangeEmail} />
                <PasswordInput type='password' placeholder="Your Password" onChange={handlerChangePassword} />
                <PasswordInput type='password' placeholder="Repeat Your Password" onChange={handlerChangePasswordRepeat} />
                <Button onClick={signIn}>Register</Button>
            </Form>
            <NavLink to='/'>LogIn</NavLink>
        </>
    );
}