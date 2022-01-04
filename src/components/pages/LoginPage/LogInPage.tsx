import * as React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { signInAction } from "../../../store/asyncActions/asuncActions";
import * as Styled from "../../../controls/controls.styled";

export default function LogIn(): JSX.Element {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlerChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlerChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const signIn = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(signInAction(email, password));
    };

    return (
        <>
            <h1>Log In Page</h1>
            <Styled.Form>
                <Styled.InputEmail
                    placeholder="Your Email"
                    value={email}
                    onChange={handlerChangeEmail}
                />
                <Styled.PasswordInput
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={handlerChangePassword}
                />
                <Styled.RegLogInButton onClick={signIn}>Sign In</Styled.RegLogInButton>
            </Styled.Form>
            <NavLink to="/register">Registration</NavLink>
        </>
    );
}
