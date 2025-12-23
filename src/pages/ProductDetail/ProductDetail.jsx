
import React, {useState,useEffect} from 'react';
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import Productcard from '../../Components/Product/Productcard';
import Loader from '../../Components/Loader/Loader';
function ProductDetail() {
  
  const {productId}=useParams()
  const [product, setproduct] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
  axios.get(`${productUrl}/products/${productId}`)
  .then((res)=>{
    setproduct(res.data)
    setIsLoading(false)
  }).catch((err)=>{
console.log(err);
setIsLoading(false)
  }
  )
    
  }, [])
  
  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <Productcard
          product={product}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </LayOut>
  );
}

export default ProductDetail
