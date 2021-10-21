import * as React from 'react';
import { useState, useEffect } from 'react';
import { RgbaStringColorPicker } from "react-colorful";
import { ReactPainter } from 'react-painter';
import { addDoc, collection } from '@firebase/firestore';
import { database } from '../../firebase/InitialFirebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { ButtonColor, ColorBlock } from '../../styledComponents/StyledComponents';

export default function Editor() {

    const idUser = useSelector((state: RootStateOrAny) => state.reduce.idUser);
    const [url, setUrl] = useState();
    const [isColorBlock, setIsColorBlock] = useState(false);
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>();
    const [imageFile, setImageFile] = useState<Blob>();
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer>();
    const [colorState, setColorState] = useState<string>('#000');

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

    const handleImage = (e: any) => {
        setImageFile(e.target.files[0]);
    };

    useEffect(() => {
        addImageInDatabase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    useEffect(() => {
        const ctx = canvasRef?.getContext('2d');
        const image = new Image();
        const reader = new FileReader();
        if(imageFile) {
            reader.readAsDataURL(imageFile);
            reader.onloadend = function () {
                if(reader.result) {
                    setImageUrl(reader.result); 
                }          
            }
        }
        if(typeof imageUrl === 'string') {
            image.src = imageUrl;
        }
        image.onload = function() { 
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            ctx ? ctx.drawImage(image, 0, 0) : null;  
        }
    }, [canvasRef, imageFile, imageUrl])

    const colorNoneOrBlokc = () => {
        setIsColorBlock(!isColorBlock);
    };

    return (
        <>
            <h1>Editor</h1>
            <ReactPainter
                width={600}
                height={600}
                onSave={blob => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob); 
                    reader.onloadend = function() {
                      const base64data: any = reader.result;   
                      setUrl(base64data);
                    }
                }}
                render = {({setColor, setLineWidth, triggerSave, getCanvasProps}) => (
                    <div>
                        <input type='file' multiple accept="image/*" onChange={handleImage} />
                        <ButtonColor onClick={colorNoneOrBlokc} color={colorState}>Color</ButtonColor>
                        <ColorBlock isBlock={isColorBlock}>
                            <RgbaStringColorPicker onChange={(e: any) => {
                                setColorState(e);
                            }} />
                            <ButtonColor onClick={() => {
                                colorNoneOrBlokc();
                                setColor(`${colorState}`);
                            }} color='lidhtgray'>{isColorBlock ? 'OK' : 'Color'}</ButtonColor>
                        </ColorBlock>
                        <input type="number" onChange={(e: any) => setLineWidth(e.target.value)} />
                        <button onClick={triggerSave}>Save</button><br />
                        <div className='border_canvas'>
                            <canvas {...getCanvasProps({ ref: ref => (setCanvasRef(ref)) })} />
                        </div>    
                    </div>
                )}
            />
        </>
    );
}