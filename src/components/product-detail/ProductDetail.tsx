
import React, {useEffect, useState} from 'react';
import { apiGetProductById } from "../../remote/e-commerce-api/productService";
import Navbar from '../navbar/Narbar';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ProductCard from '../display-products/ProductCard';
import Product from "../../models/Product";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import {
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
type Props ={
 
}

/*
interface Props{
  product: Product,
  key: number
}
*/

const ProductDetail = (props: Props) => {
  const detail = {
    margin:"20px 0px 0px 0px",
    backgroundColor:"rgba(242, 105, 38)"
,
    display: "flex"
  };
  const image={
    backgroundColor:"white",
    margin: "5px 2.5px 5px 5px",
    width: "60%"
  }
  const content={
    backgroundColor: "white",
    padding: "0px 15px 0px 15px",
    margin: "5px 5px 5px 2.5px",
    width: "40%"
  }
  const button={
    margin: "0px 20px 0px 20px",
  }
  const desc={
    borderTop: "2px solid black",
    padding: "20px 0px 0px 0px",
    margin: "20px 0px 0px 0px"
  }
  
    const [product, setProduct] = React.useState<any>({});
    const [loading, setLoading] = React.useState<boolean>(true);
 
    const location = window.location.href;
    const productId = parseInt(location.split("/")[4]);

    
    const { cart, setCart } = useContext(CartContext);


      useEffect(() => {
        getProduct();
      },[])

      const getProduct = async() =>{
        const currentProd = await apiGetProductById(productId);        
        setProduct(currentProd);
        setLoading(false);
      };    
      

      const addItemToCart = (props: Props) => {
        const readyProduct=product.payload;
        const newCart = [...cart]
        
        const index = newCart.findIndex((searchProduct) => {
          console.log("SearchProduct: ",searchProduct)
          return searchProduct.id === readyProduct.id;
        })
  
        if (index === -1) newCart.push(readyProduct)
        else newCart[index].quantity += readyProduct.quantity
        
        setCart(newCart)
        console.log("Added to cart!")
        //console.log(product.id)
      }
      
      
if (loading) {
  return (
    <>
      Loading
    </>
  )
}
  return (
    <React.Fragment>
      <Navbar/>
      <>
      <div style={detail}>
        <img style={image} src={product.payload.image} />
        
        <div style={content}>
          <div>Product Detail</div>
          <h1>{product.payload.name}</h1>
          <p>${product.payload.price}</p>
          <p>Quantity: {product.payload.quantity}</p>
          <div>
            <span>Qty</span>
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
        
            <Button onClick={() => {addItemToCart({...product.payload, quantity: 1})}} style={button} as="a" variant="primary">Add To Cart</Button>
            
          
          </div>
          <div style={desc}>
          <p>Description: {product.payload.description}</p>
          </div>
          
        </div>
      </div>
      </>
    </React.Fragment>
  )
}




export default ProductDetail
