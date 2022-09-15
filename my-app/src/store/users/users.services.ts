import apiClient from "../../apiClient";

export const getUserService = (id:number)=>{
    return apiClient.get(`users/${id}`)
}

export const userLoginService =(body:{userName:string,password:string})=>{
    return apiClient.post("auth/login",body)

}
