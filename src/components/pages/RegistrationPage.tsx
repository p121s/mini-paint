import * as React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import {
    Form,
    Input,
    InputEmail,
    PasswordInput,
    RegLogInButton,
} from "../../styledComponents/StyledComponents";
import { registrationAction } from "../../store/asyncActions/asuncActions";

export default function Registration(): JSX.Element {
    const dispatch = useDispatch();
    const history = useHistory();
    const [signUpParams, setSignUpParams] = useState({
        name: "",
        email: "",
        password: "",
        passwordRepeat: "",
    });

    const handlerChangeSignUdParams = ({ target: { name, value } }: any) => {
        setSignUpParams({
            ...signUpParams,
            [name]: value,
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
            <Form>
                <Input
                    placeholder="Your Name"
                    name="name"
                    value={signUpParams.name}
                    onChange={handlerChangeSignUdParams}
                />
                <InputEmail
                    placeholder="Your Email"
                    name="email"
                    value={signUpParams.email}
                    onChange={handlerChangeSignUdParams}
                />
                <PasswordInput
                    type="password"
                    placeholder="Your Password"
                    name="password"
                    value={signUpParams.password}
                    onChange={handlerChangeSignUdParams}
                />
                <PasswordInput
                    type="password"
                    placeholder="Repeat Your Password"
                    name="passwordRepeat"
                    value={signUpParams.passwordRepeat}
                    onChange={handlerChangeSignUdParams}
                />
                <RegLogInButton onClick={registration}>Register</RegLogInButton>
            </Form>
            <NavLink to="/">LogIn</NavLink>
        </>
    );
}
