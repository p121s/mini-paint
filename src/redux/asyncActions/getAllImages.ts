import { collection, getDocs } from '@firebase/firestore';
import { database } from '../../firebase/InitialFirebase';
import { setAllImages } from '../creatorsAsyncActions/setAllImages';

export const getAllImages = () => {
    return (dispatch: any) => {
        getDocs(collection(database, 'images'))
        .then(({docs}) => docs.map(doc => doc.data()))
        .then(res => dispatch(setAllImages(res)));
    }
};