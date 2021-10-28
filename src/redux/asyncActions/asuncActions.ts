import { collection, getDocs, query, where } from '@firebase/firestore';
import { auth, database } from '../../firebase/InitialFirebase';
import { setAllImages } from '../creatorsAsyncActions/creatorsAsyncActions';
import { setUserImages } from '../creatorsAsyncActions/creatorsAsyncActions';
import { store } from '../../redux/store';
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, getDoc, doc } from '@firebase/firestore';
import { setUserNameAction } from '../creatorsActions/creatorsActions';
import { setIdUserAction } from '../creatorsActions/creatorsActions';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { createUserWithEmailAndPassword } from '@firebase/auth';

export const getAllImages = () => {
    return (dispatch: any) => {
        getDocs(collection(database, 'images'))
        .then(({docs}) => docs.map(doc => doc.data()))
        .then(res => dispatch(setAllImages(res)));
    }
};

export const getUserImages = () => {
    const idUser = store.getState().reduce.idUser;
    return (dispatch: any) => {
        const queryInDatabase = query(collection(database, 'images'), where("user", "==", idUser));
        getDocs(queryInDatabase)
            .then(({docs}) => docs.map(doc => doc.data()))
            .then(res => dispatch(setUserImages(res)));
    }
}

export const checkingUserAuthorization = () => {
    return (dispatch: any) => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
              const uid = user.uid;
              getDoc(doc(database, 'users', `${uid}`))
                  .then(responce => responce!.data()!.userName)
                  .then(name => {
              dispatch(setUserNameAction(`${name}`));
              })
              dispatch(setIdUserAction(uid));
              }
          });
    }
};

export const signInAction = (email: string, password: string) => {
    return (dispatch: any) => {
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
    }
};

export const registrationAction = (name: string, email: string, password: string, history: any) => {
    return (dispatch: any) => {
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
    }
};