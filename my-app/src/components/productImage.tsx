import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import prodImg1 from "../images/image-product-1.jpg"
import prodImg2 from "../images/image-product-2.jpg"
import prodImg3 from "../images/image-product-3.jpg"

export default function ProductImage(props:{image:string}){
    const[images,setImages] = useState(Array<{original:string,thumbnail:string}>)
    useEffect(()=>{
        const image1=prodImg1
        const image2=prodImg2
        const image3=prodImg3
        const Images = [
            {
                original:props.image,
                thumbnail:props.image,
            },
            {
                original:image1,
                thumbnail:image1,
            },
            {
                original:image2,
                thumbnail:image2,
            },
            {
                original:image3,
                thumbnail:image3,
            },
           ]
           setImages(Images)
    },[])
   
    return(
        <div>
            <ImageGallery items={images}/>
        </div>
    )
}
