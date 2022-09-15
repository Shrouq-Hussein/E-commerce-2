import {UsersActionTypes} from "./users.action.types"
import {User,UsersAction} from "../typesIndex"
import { Dispatch } from "redux"
import {getUserService} from "./users.services"


export const getUserStart =()=>{
    return{
      type: UsersActionTypes.GET_USER_START,
    }
}
export const getUserSuccess =(user:User)=>{
    return{
      type: UsersActionTypes.GET_USER_SUCCESS,
      payload: user,
    }
}

export const getUserFailure =(err:string)=>{
    return{
      type: UsersActionTypes.GET_USER_SUCCESS,
      payload: err,
    }
}

export const getUser = (id:number) => async (dispatch:Dispatch<UsersAction>) => {
    dispatch(getUserStart())
    try {
        const response = await getUserService(id)
        console.log("response : ", response.data)
        dispatch(getUserSuccess(response.data))
    }
    catch (err:any) {
        dispatch(getUserFailure(err.message))
    }
}

// add user


export const addUserStart =()=>{
    return{
      type: UsersActionTypes.ADD_USER_START,
    }
}
export const addUserSuccess =(user:User)=>{
    return{
      type: UsersActionTypes.ADD_USER_SUCCESS,
      payload: user,
    }
}

export const addUserFailure =(err:string)=>{
    return{
      type: UsersActionTypes.ADD_USER_FAILURE,
      payload: err,
    }
}

// export const addUser = () => async (dispatch:Dispatch<UsersAction>) => {
//     dispatch(addUserStart())
//     try {
//         const response = await fetchUsersService()
//         console.log("response : ", response.data)
//         dispatch(addUserSuccess(response.data))
//     }
//     catch (err:any) {
//         dispatch(addUserFailure(err.message))
//     }
// }