import { signOut } from "@firebase/auth";
import { useHistory } from "react-router";
import {
    deleteIdUserAction,
    deleteUserNameAction,
} from "../../store/creatorsActions/creatorsActions";
import { Button } from "../../styledComponents/StyledComponents";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase/InitialFirebase";

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
                <NavLink className="button" to="/">
                    <i className="fas fa-user-alt"></i>
                </NavLink>
            </Button>
            <Button>
                <NavLink className="button" to="/history">
                    <i className="fas fa-history"></i>
                </NavLink>
            </Button>
            <Button>
                <NavLink className="button" to="/editor">
                    <i className="fas fa-palette"></i>
                </NavLink>
            </Button>
            <Button onClick={logOut}>
                <i className="fas fa-sign-out-alt"></i>
            </Button>
        </>
    );
}
