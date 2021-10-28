import * as React from 'react';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch } from 'react-redux';
import { getAllImages } from '../../redux/asyncActions/asuncActions';
import { DivScroll } from '../../styledComponents/blocks/DivScroll';
import { useSelector } from 'react-redux';

export default function HistoryPage () {

    const dispatch = useDispatch();
    const allImages = useSelector((state: RootStateOrAny) => state.reduceImages.allImages)

    useEffect(() => {
        dispatch(getAllImages());
    }, [dispatch])

    return (
        <>
            <h1>History Page</h1>
            <DivScroll>
                {allImages.map((image: any) => (
                    <img className='image'  key={image.image.substr(image.image.length - 19)} src={image.image} alt='' />
                ))}
            </DivScroll>
        </>
    );
}