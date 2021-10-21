import * as React from 'react';
import { useState, useEffect } from 'react';
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
            <div>
                {allimages.map((image: any) => (
                    <img className='image' src={image.image} alt='' />
                ))}
            </div>
        </>
    );
}