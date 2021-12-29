import { SET_ALL_USERS } from "../../constants/actionsConctants";

const INIT_STATE = {
    allUsers: [],
};

export const reducerAllUsers = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case SET_ALL_USERS:
            return { ...state, allUsers: [...action.payload] };
        default:
            return state;
    }
};
