import { collection, getDocs, query, where } from '@firebase/firestore';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { database } from '../../firebase/InitialFirebase';

export default function Account () {

    const name = useSelector((state: RootStateOrAny) => state.reduce.name);
    const idUser = useSelector((state: RootStateOrAny) => state.reduce.idUser);
    const [allimages, setAllImages] = useState<any>([]);

    useEffect(() => {
        const queryInDatabase = query(collection(database, 'images'), where("user", "==", idUser));
    getDocs(queryInDatabase)
        .then(({docs}) => docs.map(doc => doc.data()))
        .then(res => setAllImages(res));
    }, [idUser])


    return (
        <>
            <h1>My Account</h1>
            <h3>{name} Online</h3>
            <div>
                {allimages.map((image: any) => (
                    <img className='image' src={image.image} alt='' />
                ))}
            </div>
        </>
    );
}