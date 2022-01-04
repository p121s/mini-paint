import * as React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import * as Styled from "../../../controls/controls.styled";
import { registrationAction } from "../../../store/asyncActions/asuncActions";

export default function Registration(): JSX.Element {
    const dispatch = useDispatch();
    const history = useHistory();
    const [signUpParams, setSignUpParams] = useState({
        name: "",
        email: "",
        password: "",
        passwordRepeat: "",
    });

    const handlerChangeSignUdParams = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpParams({
            ...signUpParams,
            [e.target.name]: e.target.value,
        });
    };

    const registration = (e: React.FormEvent<EventTarget>) => {
        e.preventDefault();

        const { name, email, password, passwordRepeat } = signUpParams;

        if (password === passwordRepeat) {
            dispatch(registrationAction(name, email, password, history));
        } else {
            alert("Paswords don`t match");
        }
    };

    return (
        <>
            <h1>Registration Page</h1>
            <Styled.Form>
                <Styled.Input
                    placeholder="Your Name"
                    name="name"
                    value={signUpParams.name}
                    onChange={handlerChangeSignUdParams}
                />
                <Styled.InputEmail
                    placeholder="Your Email"
                    name="email"
                    value={signUpParams.email}
                    onChange={handlerChangeSignUdParams}
                />
                <Styled.PasswordInput
                    type="password"
                    placeholder="Your Password"
                    name="password"
                    value={signUpParams.password}
                    onChange={handlerChangeSignUdParams}
                />
                <Styled.PasswordInput
                    type="password"
                    placeholder="Repeat Your Password"
                    name="passwordRepeat"
                    value={signUpParams.passwordRepeat}
                    onChange={handlerChangeSignUdParams}
                />
                <Styled.RegLogInButton onClick={registration}>Register</Styled.RegLogInButton>
            </Styled.Form>
            <NavLink to="/">LogIn</NavLink>
        </>
    );
}
