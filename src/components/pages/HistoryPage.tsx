import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { collection, getDocs } from '@firebase/firestore';
import { database } from '../../firebase/InitialFirebase';

export default function HistoryPage () {

    const [allimages, setAllImages] = useState<any>([]);

    useEffect(() => {
    getDocs(collection(database, 'images'))
        .then(({docs}) => docs.map(doc => doc.data()))
        .then(res => setAllImages(res));
    }, [])

    return (
        <>
            <h1>History Page</h1>
            <NavLink to='/'>My Account</NavLink>
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