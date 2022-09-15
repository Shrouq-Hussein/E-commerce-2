import Navbar from "../components/navbar"
import { useLocation } from 'react-router-dom';
import ProductImage from "../components/productImage"
import ProductInfo from "../components/productInfo"
export default function ProductDetails() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-x-6 gap-y-10 productDetailsContainer ">
        <div className="p-3"><ProductImage image={location.state.product.image} /></div>
        <div className="p-3"><ProductInfo product={location.state.product} /></div>
      </div>
    </>
  )
}