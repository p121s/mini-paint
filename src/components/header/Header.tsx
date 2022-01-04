import { signOut } from "@firebase/auth";
import { useHistory } from "react-router";
import {
    deleteIdUserAction,
    deleteUserNameAction,
} from "../../store/creatorsActions/creatorsActions";
import { Button } from "../../controls/controls.styled";
import { useDispatch } from "react-redux";
import { auth } from "../../firebase/InitialFirebase";
import { NavLinkButton } from "../../controls/NavLinkButton";

export default function Header(): JSX.Element {
    const history = useHistory();
    const dispatch = useDispatch();

    const logOut = () => {
        signOut(auth);
        dispatch(deleteUserNameAction());
        dispatch(deleteIdUserAction());
        history.push("/");
    };
    return (
        <>
            <Button>
                <NavLinkButton to="/">
                    <i className="fas fa-user-alt"></i>
                </NavLinkButton>
            </Button>
            <Button>
                <NavLinkButton to="/history">
                    <i className="fas fa-history"></i>
                </NavLinkButton>
            </Button>
            <Button>
                <NavLinkButton to="/editor">
                    <i className="fas fa-palette"></i>
                </NavLinkButton>
            </Button>
            <Button onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i>
            </Button>
        </>
    );
}
