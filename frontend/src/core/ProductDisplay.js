import React from "react";
import { Link } from "react-router-dom";
import ShowImage from './ShowImage'
import '../styles.css'
import moment from "moment"

const ProductDisplay = ({ product }) => {

    const showAddToCartButton = () =>{
        return(
            <div className="addtocartbutton">    
            <Link to="/">
              <button className="add"><span>
                                    Add to Cart</span>
                                </button>
                            </Link>
            </div>
        )
    }

    const showStock = (quantity) =>{
            return quantity > 0 ? (
                <span className="pill1">
                        In Stock
                </span> ) : (<span className="pill2">
                        Out Of Stock
                </span>)
    }

    return (<div className="row display-inline container-fluid mt-5 mb-5">
    <div className="column">
        <div className="centered img">
            <ShowImage item={product} url="product"/>       
        </div>
    </div>
    <div className="column">
      <h4 className="black-9 ">
        {product && product.name}
      </h4>
      <hr/>
      <p className="desc">{product.description}</p>
      <h4 className="addedon">
          Added on {moment(product.createdAt).fromNow()}
      </h4>
      
      <h2 className="pricee">Rs. {product.price}</h2>
      <p className="mt-5">Will be delivered in {product.delivery} days</p>

        {showStock(product.quantity)}
        {showAddToCartButton()}

    </div>

    </div>
  
    );
};

export default ProductDisplay;

