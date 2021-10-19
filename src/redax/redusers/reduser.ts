const INIT_STATE = {
    name: '',
    idUser: '',
};

export const reduser = (state = INIT_STATE, action: any) => {
    switch(action.type) {
        case "SET_NAME":
            return {...state, name: action.payload};
        case "SET_ID_USER":
            return {...state, idUser: action.payload};
        default:
            return state;
    }
}