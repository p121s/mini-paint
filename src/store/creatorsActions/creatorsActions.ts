import {
    DELETE_ID_USER,
    DELETE_NAME,
    SET_ID_USER,
    SET_NAME,
} from "../../constants/actionsConctants";

export const deleteIdUserAction = () => ({ type: DELETE_ID_USER });

export const deleteUserNameAction = () => ({ type: DELETE_NAME });

export const setIdUserAction = (payload: string) => ({
    type: SET_ID_USER,
    payload,
});

export const setUserNameAction = (payload: string) => ({
    type: SET_NAME,
    payload,
});
