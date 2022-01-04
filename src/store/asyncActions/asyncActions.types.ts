import { DocumentData } from "@firebase/firestore";

export type Action = {
    type: string;
    payload?: DocumentData[] | string
}