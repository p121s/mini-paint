import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { RgbaStringColorPicker } from "react-colorful";
import { ReactPainter } from 'react-painter';
import { addDoc, collection } from '@firebase/firestore';
import { database } from '../../firebase/InitialFirebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { ColorBlock } from '../../styledComponents/StyledComponents';

export default function Editor() {

    const idUser = useSelector((state: RootStateOrAny) => state.redus.idUser);
    const [url, setUrl] = useState();
    const [isColorBlock, setIsColorBlock] = useState(false);
    console.log(url);

    const addImageInDatabase = () => {
        if(url) {
            try{
                addDoc(collection(database, 'images'), {
                    user: idUser,
                    image: url,
                })
                alert('OK');
            } catch(e) {
                alert('Error adding image');
            }
        }
    };

    useEffect(() => {
        addImageInDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    const colorNoneOrBlokc = () => {
        setIsColorBlock(!isColorBlock);
    };

    return (
        <>
            <h1>Editor</h1>
            <NavLink to='/'>My Account</NavLink>
            <NavLink to='/history'>History</NavLink>
            <ReactPainter
                width={600}
                height={600}
                onSave={blob => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob); 
                    reader.onloadend = function() {
                      const base64data: any = reader.result;                
                      console.log(base64data);
                      setUrl(base64data);
                    }
                }}
                render = {({canvas, setColor, setLineWidth, triggerSave}) => (
                    <div>
                        {console.log(canvas)}
                        <button onClick={colorNoneOrBlokc}>{isColorBlock ? 'OK' : 'Color'}</button>
                        <ColorBlock isBlock={isColorBlock}>
                            <RgbaStringColorPicker onChange={setColor} />
                        </ColorBlock>
                        <input type="number" onChange={(e: any) => setLineWidth(e.target.value)} />
                        <button onClick={triggerSave}>Save</button>
                        <div className='canvas_block'>{canvas}</div>
                    </div>
                )}
            />
        </>
    );
}