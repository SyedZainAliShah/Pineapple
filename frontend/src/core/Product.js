import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read,listRelated } from "./apiCore";
import Card from "./Card";
import '../styles.css'
import ProductDisplay from "./ProductDisplay"

const Product = (props) =>{

    const [product,setProduct] = useState({})
    const [relatedProduct,setRelatedProduct] = useState([])
    const [error,setError] = useState(false)

    const loadSingleProduct = productId =>{
            read(productId).then(data=>{
                if(data.error){
                    setError(data.error)
                }
                else{
                    setProduct(data)
                    //fetch related products
                    listRelated(data._id).then(data => {
                        if (data.error) {
                            setError(data.error);
                        } else {
                            setRelatedProduct(data);
                        }
                    });
                }
            })
    }

    useEffect(() =>{
            const productId = props.match.params.productId
            loadSingleProduct(productId)
    },[props])

    return (
        <Layout
            title={product.category && product.category.name}
            description=""
            className="container-fluid">
            <hr />
            <div className="row">
                <div>
                    {product && product.description &&
                        <ProductDisplay product={product} />
                    }
                </div>
                <hr/>
 
                <h4 className="headingg">You might also like</h4>
                <div className="row mb-5">
                    {relatedProduct.map((p, i) => (
                            <Card key={i} product={p} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}


export default Product