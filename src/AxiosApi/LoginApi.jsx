import axios from "axios";

const Base_Url = import.meta.env.VITE_BASE_URL;

export const AuthUser=(payLoad)=>{
    axios.post(Base_Url,payLoad)
}