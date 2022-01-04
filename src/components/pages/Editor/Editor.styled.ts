import styled from "styled-components";
import { isEditorModalBlock } from "./Editor.interfaces";

export const EditorModalBlock = styled.div<isEditorModalBlock>`
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${({ isBlock }) => (isBlock ? "block" : "none")};
    padding: 50px;
    background-color: rgb(240, 240, 240);
    text-align: center;
    border: 1px solid lightgray;
`;

export const InputColor = styled.input.attrs(() => ({
    type: "color",
}))`
    width: 80%;
    margin-bottom: 20px;
`;

export const InputRange = styled.input.attrs(() => ({
    type: "range",
}))`
    width: 80%;
    margin-bottom: 20px;
`;

export const InputFile = styled.input.attrs(() => ({
    type: "file",
}))`
    display: none;
`;

export const DivCanvas = styled.div`
    text-align: center;
`;

export const EditorControlsBlock = styled.div`
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
`;

export const CustomInputFile = styled.label`
    text-align: center;
    flex-basic: content;
    height: 70px;
    justify-content: center;
    background: rgb(240, 240, 240);
    border: none;
    flex-grow: 1;
    border-left: 2px solid rgb(247, 247, 247);
    border-right: 2px solid rgb(220, 220, 220);

    span {
        position: relative;
        top: 28%;
        font-size: 20px;
    }

    &:hover {
        background: lightblue;
        cursor: pointer;
        border-left: 2px solid rgb(220, 220, 220);
        border-right: 2px solid rgb(247, 247, 247);
    }
`;
