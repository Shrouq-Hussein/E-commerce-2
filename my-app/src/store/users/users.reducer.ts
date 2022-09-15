
import { type } from "os"
import { UsersActionTypes } from "./users.action.types"
import {UsersAction , UsersState} from "../typesIndex"
const initialState = {
    isLoading: false,
    currentUser: {"address":{"geolocation":{"lat":"-37.3159","long":"81.1496"},"city":"kilcoole","street":"new road","number":7682,"zipcode":"12926-3874"},"id":1,"email":"john@gmail.com","username":"johnd","password":"m38rmF$","name":{"firstname":"john","lastname":"doe"},"phone":"1-570-236-7033"},
    errorMessage: undefined,
    token:undefined,
    cart:[],
}

const usersReducer = (state: UsersState = initialState, action:UsersAction) :UsersState => {

    switch (action.type) {
        case UsersActionTypes.ADD_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case UsersActionTypes.ADD_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
            }
        case UsersActionTypes.ADD_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        case UsersActionTypes.GET_USER_START:
            return {
                ...state,
                isLoading: true,
            }
        case UsersActionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                // currentUser: action.payload,
            }
        case UsersActionTypes.GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                errorMessage: action.payload,
            }
        default :
        return state

    }


}

export default usersReducer