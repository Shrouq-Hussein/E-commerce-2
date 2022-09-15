import {ProductsActionTypes} from "./products.action.types"
import {Product,ProductsAction} from "../typesIndex"
import { Dispatch } from "redux"
import {getProductsService} from "./products.services"

export const getProductsStart =()=>{
    return{
      type: ProductsActionTypes.GET_PRODUCTS_START,
    }
}
export const getProductsSuccess =(productsList:Array<Product>)=>{
    return{
      type: ProductsActionTypes.GET_PRODUCTS_SUCCESS,
      payload: productsList,
    }
}
export const getProductsFailure =(err:string)=>{
    return{
      type: ProductsActionTypes.GET_PRODUCTS_FAILURE,
      payload: err,
    }
}


export const getProducts = () => async (dispatch:Dispatch<ProductsAction>) => {
    dispatch(getProductsStart())
    try {
        const response = await getProductsService()
        console.log("response : ", response.data)
        dispatch(getProductsSuccess(response.data))
    }
    catch (err:any) {
        dispatch(getProductsFailure(err.message))
    }
}
