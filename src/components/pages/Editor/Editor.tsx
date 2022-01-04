import { useState, useEffect } from "react";
import { ReactPainter } from "react-painter";
import { addDoc, collection } from "@firebase/firestore";
import { database } from "../../../firebase/InitialFirebase";
import { RootStateOrAny, useSelector } from "react-redux";
import { EditorModalBlock, InputColor, InputFile, InputRange, DivCanvas, EditorControlsBlock, CustomInputFile } from "./Editor.styled";
import { Button } from "../../../controls/controls.styled";

export default function Editor(): JSX.Element {
    const idUser = useSelector((state: RootStateOrAny) => state.reduce.idUser);
    const [url, setUrl] = useState<string>();
    const [isColorBlock, setIsColorBlock] = useState<boolean>(false);
    const [isWidthBrushBlock, setIsWidthBrushBlock] = useState<boolean>(false);
    const [isDrawRectBlock, setIsDrawRectBlock] = useState<boolean>(false);
    const [isDrawArcBlock, setIsDrawArcBlock] = useState<boolean>(false);
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement>();
    const [imageFile, setImageFile] = useState<Blob>();
    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer>();
    const [colorState, setColorState] = useState<string>("#000");
    const [figure, setFigure] = useState<string>("");
    const [widthRect, setWidthRect] = useState<number>(50);
    const [heightRect, setHeightRect] = useState<number>(50);
    const [diameterArc, setDiameterArc] = useState<number>(50);

    useEffect(() => {
        if (canvasRef) {
            canvasRef.style.cssText = `
                backgroundColor: 'white';
                border: 1px solid lightgray;
                max-width: 1000px;
            `;
        }
    }, [canvasRef]);

    const addImageInDatabase = () => {
        if (url) {
            try {
                addDoc(collection(database, "images"), {
                    user: idUser,
                    image: url,
                });
                alert("OK");
            } catch (e) {
                alert("Error adding image");
            }
        }
    };

    const handleImage = (e: any) => {
        setImageFile(e.target.files[0]);
    };

    const handleWidthRect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWidthRect(+e.target.value);
    };

    const handleHeightRect = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeightRect(+e.target.value);
    };

    const handleDiameterArc = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDiameterArc(+e.target.value);
    };

    const changeColor = (setColor: any) => {
        setIsColorBlock(!isColorBlock);
        setColor(`${colorState}`);
    };

    const chooseFigure = (figure: string) => {
        setFigure(figure);
        if (figure === "Rect") {
            setIsDrawRectBlock(!isDrawRectBlock);
        } else if (figure === "Arc") {
            setIsDrawArcBlock(!isDrawArcBlock);
        }
    };

    useEffect(() => {
        addImageInDatabase();
    }, [url]);

    useEffect(() => {
        const ctx = canvasRef?.getContext("2d");
        const image = new Image();
        const reader = new FileReader();
        if (imageFile) {
            reader.readAsDataURL(imageFile);
            reader.onloadend = () => {
                if (reader.result) {
                    setImageUrl(reader.result);
                }
            };
        }
        if (typeof imageUrl === "string") {
            image.src = imageUrl;
        }
        image.onload = () => {
            image.width =
                document.documentElement.clientWidth - 100 < 1000
                    ? document.documentElement.clientWidth - 100
                    : 1000;
            image.height = image.naturalHeight / (image.naturalWidth / image.naturalHeight);
            ctx && ctx.drawImage(image, 0, 0, image.width, image.height);
        };
    }, [canvasRef, imageFile, imageUrl]);

    const drawRect = (e: any) => {
        const ctx = e.target.getContext("2d");
        const { x, y } = e.target.getBoundingClientRect();
        const PointX = e.clientX - x - widthRect / 2;
        const PointY = e.clientY - y - heightRect / 2;
        ctx.fillStyle = colorState;
        ctx.fillRect(PointX, PointY, widthRect, heightRect);
    };

    const drawArc = (e: any) => {
        const ctx = e.target.getContext("2d");
        const { x, y } = e.target.getBoundingClientRect();
        ctx.beginPath();
        ctx.fillStyle = colorState;
        ctx.arc(e.clientX - x, e.clientY - y, diameterArc / 2, 0, Math.PI * 2, true);
        ctx.fill();
    };

    const drawFigure = (e: React.MouseEvent<HTMLElement>) => {
        if (figure === "Rect") {
            drawRect(e);
        } else if (figure === "Arc") {
            drawArc(e);
        }
        setFigure("");
    };

    return (
        <>
            <h1>Editor</h1>

            <ReactPainter
                width={
                    document.documentElement.clientWidth - 100 < 1000
                        ? document.documentElement.clientWidth - 100
                        : 1000
                }
                height={
                    document.documentElement.clientWidth - 100 < 1000
                        ? document.documentElement.clientWidth - 100
                        : 1000
                }
                onSave={(blob) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onloadend = function () {
                        const base64data: any = reader.result;
                        setUrl(base64data);
                    };
                }}
                render={({ setColor, setLineWidth, triggerSave, getCanvasProps }) => (
                    <div>
                        <EditorModalBlock isBlock={isColorBlock}>
                            <InputColor
                                type="color"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setColorState(e.target.value);
                                }}
                            />
                            <br></br>
                            <button
                                onClick={() => {
                                    changeColor(setColor);
                                }}
                                color="lidhtgray"
                            >
                                OK
                            </button>
                        </EditorModalBlock>
                        <EditorModalBlock isBlock={isWidthBrushBlock}>
                            <InputRange
                                type="range"
                                min="1"
                                max="200"
                                step="1"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setLineWidth(+e.target.value)
                                }
                            />
                            <br></br>
                            <button
                                onClick={() => {
                                    setIsWidthBrushBlock(!isWidthBrushBlock);
                                }}
                            >
                                OK
                            </button>
                        </EditorModalBlock>
                        <EditorModalBlock isBlock={isDrawRectBlock}>
                            <label>Width {widthRect}px</label>
                            <br></br>
                            <InputRange
                                type="range"
                                min="1"
                                max="200"
                                step="1"
                                value={widthRect}
                                onChange={handleWidthRect}
                            />
                            <br></br>
                            <label>Height {heightRect}px</label>
                            <br></br>
                            <InputRange
                                type="range"
                                min="1"
                                max="200"
                                step="1"
                                value={heightRect}
                                onChange={handleHeightRect}
                            />
                            <br></br>
                            <button
                                onClick={() => {
                                    chooseFigure("Rect");
                                }}
                            >
                                OK
                            </button>
                        </EditorModalBlock>
                        <EditorModalBlock isBlock={isDrawArcBlock}>
                            <label>Diameter {diameterArc}px</label>
                            <br></br>
                            <InputRange
                                type="range"
                                min="1"
                                max="200"
                                step="1"
                                value={diameterArc}
                                onChange={handleDiameterArc}
                            />
                            <br></br>
                            <button
                                onClick={() => {
                                    chooseFigure("Arc");
                                }}
                            >
                                OK
                            </button>
                        </EditorModalBlock>
                        <DivCanvas>
                            <canvas
                                {...getCanvasProps({ ref: (ref) => setCanvasRef(ref) })}
                                onClick={drawFigure}
                            />
                        </DivCanvas>
                        <EditorControlsBlock>
                            <CustomInputFile htmlFor="input_file">
                                <span>
                                    <i className="fas fa-file-import"></i>
                                </span>
                            </CustomInputFile>
                            <InputFile
                                type="file"
                                multiple
                                accept="image/*"
                                id="input_file"
                                onChange={handleImage}
                            />
                            <Button
                                onClick={() => {
                                    setIsColorBlock(!isColorBlock);
                                }}
                            >
                                <i className="fas fa-tint"></i>
                            </Button>
                            <Button
                                onClick={() => {
                                    setIsWidthBrushBlock(!isWidthBrushBlock);
                                }}
                            >
                                <i className="fas fa-paint-brush"></i>
                            </Button>
                            <Button onClick={() => setIsDrawRectBlock(!isDrawRectBlock)}>
                                <i className="fas fa-square"></i>
                            </Button>
                            <Button onClick={() => setIsDrawArcBlock(!isDrawArcBlock)}>
                                <i className="fas fa-circle"></i>
                            </Button>
                            <Button onClick={triggerSave}>
                                <i className="fas fa-save"></i>
                            </Button>
                        </EditorControlsBlock>
                    </div>
                )}
            />
        </>
    );
}
