import * as React from 'react';
import { useState, useEffect } from 'react';
import { RgbaStringColorPicker } from "react-colorful";
import { ReactPainter } from 'react-painter';
import { addDoc, collection } from '@firebase/firestore';
import { database } from '../../firebase/InitialFirebase';
import { RootStateOrAny, useSelector } from 'react-redux';
import { Button, ColorBlock, EditorControlsBlock, WidthBrushBlock, CustomInputFile } from '../../styledComponents/StyledComponents';

export default function Editor() {

    const idUser = useSelector((state: RootStateOrAny) => state.reduce.idUser);
    const [url, setUrl] = useState();
    const [isColorBlock, setIsColorBlock] = useState(false);
    const [isWidthBrushBlock, setIsWidthBrushBlock] = useState(false);
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>();
    const [imageFile, setImageFile] = useState<Blob>();
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer>();
    const [colorState, setColorState] = useState<string>('#000');

    

    useEffect(() => {
        if(canvasRef) {
            canvasRef.style.cssText = `
                backgroundColor: 'white';
                border: 1px solid lightgray;
                max-width: 1000px;
            `;
        }
    }, [canvasRef])

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

    const widthBrushNoneOrDlock = () => {
        setIsWidthBrushBlock(!isWidthBrushBlock);
    };

    return (
        <>
            <h1>Editor</h1>
            
            <ReactPainter
                width={document.documentElement.clientWidth - 100 < 1000 ? document.documentElement.clientWidth - 100 : 1000}
                height={document.documentElement.clientWidth - 100 < 1000 ? document.documentElement.clientWidth - 100 : 1000}
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
                        <ColorBlock isBlock={isColorBlock}>
                            {/* <RgbaStringColorPicker onChange={(e: any) => {
                                setColorState(e);
                            }} /> */}
                            <input type='color' onChange={({target: {value}}: any) => {
                                setColorState(value);
                            }} /><br></br>
                            <button onClick={() => {
                                colorNoneOrBlokc();
                                setColor(`${colorState}`);
                            }} color='lidhtgray'>OK</button>
                        </ColorBlock>
                        <WidthBrushBlock isBlock={isWidthBrushBlock}>
                            <input type="range" min='1' max='200' step='1' onChange={(e: any) => setLineWidth(e.target.value)} /><br></br>
                            <button onClick={widthBrushNoneOrDlock}>OK</button>
                        </WidthBrushBlock>
                        <div className='border_canvas'>
                            <canvas {...getCanvasProps({ ref: ref => (setCanvasRef(ref)) })} />
                        </div>
                        <EditorControlsBlock>
                            <CustomInputFile htmlFor='input_file'><span>Choose File</span></CustomInputFile>
                            <input type='file' multiple accept="image/*" id='input_file' onChange={handleImage} />
                            <Button onClick={colorNoneOrBlokc}>Color</Button>
                            <Button onClick={widthBrushNoneOrDlock}>Width brush</Button>
                            <Button onClick={triggerSave}>Save</Button>
                        </EditorControlsBlock>
                    </div>
                )}
            />
        </>
    );
}