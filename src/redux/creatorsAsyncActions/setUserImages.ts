import { GET_USER_IMAGES } from "../../constants/actionsConctants";
import { DocumentData } from "@firebase/firestore";

export const setUserImages = (payload: DocumentData[]) => ({type: GET_USER_IMAGES, payload});