import React, { useState, useEffect } from "react";
import { getCategories,list } from "./apiCore";
import Card from "./Card";
import '../styles.css'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: "",
        search: "",
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({ ...data, categories: data });
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchSubmit = e => {
        e.preventDefault();
        searchData();
    };
    const searchData = () => {
        // console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category }).then(
                response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({ ...data, results: response, searched: true });
                    }
                }
            );
        }
    };
    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, searched: false });
    };

    const searchMessage = (searched,results) =>{
        if(searched && results.length>0){
            return `Found ${results.length} products for you`
        }
        if(searched && results.length<1){
            return `No Products Found`
        }
    }


    const searchedProducts  = (results=[]) =>{
        return(
            <div>
                <h4 className="headingg mt-3">
                    {searchMessage(searched,results)}
                </h4>

                <div className="row">
                    {results.map((product,i) => (<Card key={i} product={product} />))}
                </div>
            </div>
        )
    }

    const searchForm = () => (
        <form className="form-inline" onSubmit={searchSubmit}>
            <span className="spanchange">
                <div className="input-group mt-3">
                    <div className="">
                        <select
                            className="btn mt-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">Category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        type="search"
                        className="form-control"
                        onChange={handleChange("search")}
                        placeholder="Hey... What do you need?"
                    />
                    <div className="input-group-append" style={{ border: "none" }}>
                    <button className="">Search</button>
                    </div>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container-fluid">{searchForm()}</div>
            <div className="container-fluid mb-3">{searchedProducts(results)}</div>
        </div>
    );
};

export default Search;
