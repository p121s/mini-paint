import { collection, getDocs, query, where } from '@firebase/firestore';
import { database } from '../../firebase/InitialFirebase';
import { setAllImages } from '../creatorsAsyncActions/creatorsAsyncActions';
import { setUserImages } from '../creatorsAsyncActions/creatorsAsyncActions';
import { store } from '../../redux/store';

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