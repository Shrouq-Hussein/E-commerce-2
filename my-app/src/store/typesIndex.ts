export type User = {
    id?: number,
    email?: string,
    username?: string,
    password?: string,
    name?: {
        firstname: string,
        lastname: string
    },
    address?: {
        city: string,
        street: string,
        number: number,
        zipcode: string,
        geolocation: {
            lat: string,
            long: string
        }
    },
    phone?: string,
    cart?:Array<CartItem>,
}
export type UsersState = {
    isLoading: boolean,
    currentUser: User , //////////////////////////////////
    errorMessage: string | undefined | User,
    token: string | undefined | User,
    cart:Array<Product>,

}
export type Product =
{
    id?: number,
    title?:string,
    price?:number,
    category?:string,
    description?:string,
    image?:string,
    rating?: {
        rate: number,
        count: number,
    }
}
export type ProductsState = {
    isLoading: boolean,
    currentProduct: Product | undefined ,
    errorMessage: string | undefined,
    productsList: Array<Product> | undefined,
    
}
// interface ADDUSERSTART{
//     type:"ADD_USER_START",
// }
// interface ADDUSERSUCESS{
//     type:"ADD_USER_SUCESS",
// }
// interface GETUSERSTART{
//     type:"GET_USER_START",
// }

// interface GetUserSuccess {
//     type:"GET_USER_SUCCESS",
//     payload: User,
// }
// interface GetUserFAILURE {
//     type:"GET_USER_FAILURE",
//     payload: string,
// }
///////////////////////////////////////////////////
interface Actions<T> {
    readonly type: string;
    payload?: T;
}

export type UsersAction = Actions<string> | Actions<User> | Actions<undefined> |Actions<Product>

export type ProductsAction = Actions<string> | Actions<Product> |Actions<Array<Product>> | Actions<undefined>

export type CartItem ={
    id?: number,
    title?:string,
    price?:number,
    category?:string,
    description?:string,
    image?:string,
    rating?: {
        rate: number,
        count: number,
    },
    quantity?:number,

}