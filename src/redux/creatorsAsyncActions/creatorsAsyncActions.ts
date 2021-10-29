import { DocumentData } from "@firebase/firestore";
import { GET_ALL_IMAGES, GET_USER_IMAGES, SET_ALL_USERS } from "../../constants/actionsConctants";

export const setAllImages = (payload: DocumentData[]) => ({type: GET_ALL_IMAGES, payload});

export const setUserImages = (payload: DocumentData[]) => ({type: GET_USER_IMAGES, payload});

export const setAllUsers = (payload: DocumentData[]) => ({type: SET_ALL_USERS, payload});