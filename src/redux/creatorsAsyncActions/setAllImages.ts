import { DocumentData } from "@firebase/firestore";
import { GET_ALL_IMAGES } from "../../constants/actionsConctants";


export const setAllImages = (payload: DocumentData[]) => ({type: GET_ALL_IMAGES, payload});