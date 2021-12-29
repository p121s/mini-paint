import { GET_USER_IMAGES, GET_ALL_IMAGES } from "../../constants/actionsConctants";

const INIT_STATE = {
    userImages: [],
    allImages: [],
};

export const reducerImageDate = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case GET_USER_IMAGES:
            return { ...state, userImages: [...action.payload] };
        case GET_ALL_IMAGES:
            return { ...state, allImages: [...action.payload] };
        default:
            return state;
    }
};
