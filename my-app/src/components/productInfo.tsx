import { Product } from '../store/typesIndex';
import plusIcon from "../images/icon-plus.svg"
import minusIcon from "../images/icon-minus.svg"
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from "../hooks"
import {addtoUserCart} from "../store/users/usersSlice"
export default function ProductInfo(props: { product: Product }) {
    const dispatch = useAppDispatch()

    const [counter, setCounter] = useState(0)
    const [cart, setCart] = useState([])

    const addtoCart =( product: Product)=>{
        dispatch(addtoUserCart(product))
    }
    return (
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-rows-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div className="lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">{props.product.title}</h1>
            </div>
            <div className="mt-8 mb-8  ">
                <p className="text-3xl  tracking-tight text-gray-900">{props.product.description}</p>
            </div>
            <div className="mt-8 mb-8  ">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl font-bold  tracking-tight text-gray-900">${props.product.price}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-10 productDetailsContainer ">
                <div className='grid grid-cols-3 counter'>
                    <button className=''> <img src={minusIcon}  className="ml-4"/></button>
                    <button className='font-bold'>{counter}</button>
                    <button className=' border '> <img src={plusIcon} className="ml-4" /></button>
                </div>
                <div>
                    <button
                        type="submit"
                        className=" flex w-full items-center justify-center rounded-md border border-transparent  py-3 px-8 text-base font-medium text-white  focus:outline-none  addtoCartBtn"
                        onClick={()=>{addtoCart(props.product)}}
                    >
                        Add to cart
                    </button>
                </div>

            </div>

        </div>
    )
}