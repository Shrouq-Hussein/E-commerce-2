import { useEffect } from 'react';
import { getProductsAsync } from "../store/products/productSlice"
import { userLoginAsync } from "../store/users/usersSlice"
import { useAppSelector, useAppDispatch } from "../hooks"
import { Product } from "../store/typesIndex"
import Navbar from "../components/navbar"
import { useNavigate } from 'react-router-dom';

export default function ProductsList() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.productsList)
  const currentUser = useAppSelector((state) => state.users.currentUser)
  // const token = useAppSelector((state) => state.users.token)
  useEffect(() => {

    if (!(currentUser && currentUser.id)) {
      //redirect to products
      alert("Invalid email or password!");
      navigate("/signin")
     
    }
    else {
      dispatch(getProductsAsync())
      // dispatch(userLoginAsync({userName: "mor_2314",password:"83r5^_"}))
      console.log("products")
    }
  }, [])

  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative productCard p-3" onClick={() => { navigate(`/product/${product.id}`, { state: { product: product } }) }}>
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 ">
                  <div>
                    <h3 className="">
                      {/* <a href="#"> */}
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                      {/* </a> */}
                    </h3>
                  </div>
                  <div><p className="mt-1 text-sm text-gray-500">{product.rating?.rate}</p></div>
                  <div> <p className="text-sm font-medium text-gray-900">${product.price}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>



  )
}
