import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useUserContext = () => useContext(AuthContext);