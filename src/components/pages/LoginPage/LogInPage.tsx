import * as React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { signInAction } from "../../../store/asyncActions/asuncActions";
import { Form, RegLogInButton, InputEmail, PasswordInput } from "../../../controls/controls.styled";

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
            <Form>
                <InputEmail placeholder="Your Email" value={email} onChange={handlerChangeEmail} />
                <PasswordInput
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={handlerChangePassword}
                />
                <RegLogInButton onClick={signIn}>Sign In</RegLogInButton>
            </Form>
            <NavLink to="/register">Registration</NavLink>
        </>
    );
}
