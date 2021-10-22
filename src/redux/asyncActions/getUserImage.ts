import { collection, getDocs, query, where } from '@firebase/firestore';
import { database } from '../../firebase/InitialFirebase';
import { setUserImages } from '../creatorsAsyncActions/setUserImages';
import { store } from '../../redux/store';



export const getUserImages = () => {
    const idUser = store.getState().reduce.idUser;
    console.log(idUser);
    return (dispatch: any) => {
        const queryInDatabase = query(collection(database, 'images'), where("user", "==", idUser));
        getDocs(queryInDatabase)
            .then(({docs}) => docs.map(doc => doc.data()))
            .then(res => dispatch(setUserImages(res)));
    }
}