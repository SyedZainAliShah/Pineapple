import React, { useState, useEffect } from "react";
import { API } from "../config";

const ShowImage = ({item,url}) => {
    return(
        
        <div className="product-img">
            <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3" style={{maxHeight:'100%', maxWidth:'100%'}}></img>
        </div>
    )
}

export default ShowImage;