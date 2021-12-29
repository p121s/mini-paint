import {
    SET_NAME,
    SET_ID_USER,
    DELETE_NAME,
    DELETE_ID_USER,
} from "../../constants/actionsConctants";

const INIT_STATE = {
    name: "",
    idUser: "",
};

export const reducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case SET_NAME:
            return { ...state, name: action.payload };
        case SET_ID_USER:
            return { ...state, idUser: action.payload };
        case DELETE_NAME:
            return { ...state, name: "" };
        case DELETE_ID_USER:
            return { ...state, idUser: "" };
        default:
            return state;
    }
};
