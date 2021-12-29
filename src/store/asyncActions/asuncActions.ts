import { collection, getDocs, query, where, setDoc, getDoc, doc } from "@firebase/firestore";
import { auth, database } from "../../firebase/InitialFirebase";
import {
    setAllImages,
    setUserImages,
    setAllUsers,
} from "../creatorsAsyncActions/creatorsAsyncActions";
import { store } from "../../store/store";
import { onAuthStateChanged } from "firebase/auth";
import { setUserNameAction, setIdUserAction } from "../creatorsActions/creatorsActions";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth";

export const getAllImages = () => {
    return (dispatch: any) => {
        getDocs(collection(database, "images"))
            .then(({ docs }) => docs.map((doc) => doc.data()))
            .then((res) => dispatch(setAllImages(res)));
    };
};

export const getUserImages = (userID?: string) => {
    const idUser = userID || store.getState().reduce.idUser;
    return (dispatch: any) => {
        const queryInDatabase = query(collection(database, "images"), where("user", "==", idUser));
        getDocs(queryInDatabase)
            .then(({ docs }) => docs.map((doc) => doc.data()))
            .then((res) => dispatch(setUserImages(res)));
    };
};

export const checkingUserAuthorization = () => {
    return (dispatch: any) => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                const uid = user.uid;
                getDoc(doc(database, "users", `${uid}`))
                    .then((responce) => responce?.data()?.userName)
                    .then((name) => {
                        dispatch(setUserNameAction(`${name}`));
                    });
                dispatch(setIdUserAction(uid));
            }
        });
    };
};

export const signInAction = (email: string, password: string) => {
    return (dispatch: any) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((responce) => responce.user.uid)
            .then((id) => {
                getDoc(doc(database, "users", `${id}`))
                    .then((responce) => responce?.data()?.userName)
                    .then((name) => {
                        dispatch(setUserNameAction(`${name}`));
                    });
                dispatch(setIdUserAction(id));
            })
            .catch((error) => alert(error));
    };
};

export const registrationAction = (name: string, email: string, password: string, history: any) => {
    return (dispatch: any) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((responce) => {
                if (responce.user.uid) {
                    setDoc(doc(database, `users`, `${responce.user.uid}`), {
                        userName: name,
                        userEmail: email,
                        userID: responce.user.uid,
                    });
                    dispatch(setUserNameAction(name));
                    dispatch(setIdUserAction(responce.user.uid));
                    history.push("/");
                } else {
                    alert("Don`t creaate new user in database!");
                }
                return responce;
            })
            .catch((error) => alert(error));
    };
};

export const getAllUsers = () => {
    return (dispatch: any) => {
        getDocs(collection(database, "users"))
            .then(({ docs }) => docs.map((doc) => doc.data()))
            .then((res) => dispatch(setAllUsers(res)));
    };
};
