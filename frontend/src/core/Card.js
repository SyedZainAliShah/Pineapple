import React from "react";
import { Link } from "react-router-dom";
import ShowImage from './ShowImage'
import '../styles.css'

const Card = ({ product }) => {

    const showAddToCartButton = () =>{
      return(<Link to="/">
      <button class="add"><span>
                            Add to Cart</span>
                        </button>
                    </Link>)
    }

    return (<div class="container mt-5">
    <div class="images">
      
    <ShowImage item={product} url="product" />
    </div>
  
  
    <div class="product">
      <h1>{product.name}</h1>
      <h2>Rs. {product.price}</h2>
      <p>Will be delivered in {product.delivery} days</p>
      <p class="desc">{product.description}</p>
      <div class="buttons">
      <Link to ={`/product/${product._id}`}>
        <button class="add">
                              View Product
                          </button>
                      </Link>      

      </div>
        {showAddToCartButton()}
    </div>
  </div>
  
    );
};

export default Card;
