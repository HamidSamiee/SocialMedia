
import { createContext } from "react";
import { IContextType } from "@/types";
import { INITIAL_STATE } from "@/constants";


export const AuthContext = createContext<IContextType>(INITIAL_STATE);




