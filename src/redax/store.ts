import { createStore } from "redux";
import { rootReduser } from "./redusers/rootReduser";


export const store = createStore(rootReduser);