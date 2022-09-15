import { ProductsActionTypes } from "./products.action.types"
import {ProductsState ,ProductsAction} from "../typesIndex"
const initialState :ProductsState= {
    isLoading: false,
    currentProduct: {},
    errorMessage: undefined,
    productsList: [],
    // token:undefined,
}

const productsReducer = (state: ProductsState = initialState, action:ProductsAction) :ProductsState => {

    switch (action.type) {
        case ProductsActionTypes.GET_PRODUCTS_START:
            return {
                ...state,
                isLoading: true,
            }
        // case ProductsActionTypes.GET_PRODUCTS_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         productsList: action.payload,
        //     }
        // case ProductsActionTypes.GET_PRODUCTS_FAILURE:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         errorMessage: action.payload,
        //     }
        case ProductsActionTypes.GET_PRODUCT_START:
            return {
                ...state,
                isLoading: true,
            }
        // case ProductsActionTypes.GET_PRODUCT_SUCCESS:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         currentProduct: action.payload,
        //     }
        // case ProductsActionTypes.GET_PRODUCT_FAILURE:
        //     return {
        //         ...state,
        //         isLoading: false,
        //         errorMessage: action.payload,
        //     }
        default :
        return state

    }


}

export default productsReducer