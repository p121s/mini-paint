import { collection, getDocs, query, where } from '@firebase/firestore';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { database } from '../../firebase/InitialFirebase';

export default function Account () {

    const name = useSelector((state: RootStateOrAny) => state.redus.name);
    const idUser = useSelector((state: RootStateOrAny) => state.redus.idUser);
    const [allimages, setAllImages] = useState<any>([]);

    console.log(name, idUser);

    console.log(allimages);

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
            <NavLink to='/history'>History</NavLink>
            <NavLink to='/editor'>Editor</NavLink>
            <div>
                {allimages ? (
                    <>
                        {allimages.map((image: any) => (
                            <img src={image.image} alt='' />
                        ))}
                    </>
                ) : ''}
            </div>
        </>
    );
}