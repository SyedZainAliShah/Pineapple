import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import '../styles.css';


const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size)
                setSkip(0)
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults,...data.data]);
                setSize(data.size)
                setSkip(toSkip)
            }
        });
    };

    const loadMoreButton = () =>{
        return(
            size>0 && size>=limit && (
                <button className="loadmorebutton" onClick={loadMore}>Load more</button>
            )
        )
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Browse"
            description="Create your outfit!"
            className="container-fluid"
        >
            <hr />
            <div class="row">
            <div className="boxit col-2">
                
                    <h4 className="mt-3 ml-2">Filter by categories</h4>

                    <ul class="ks-cboxtags">
                            <Checkbox
                            categories={categories}
                            handleFilters={filters =>
                            handleFilters(filters, "category")
                            }
                            />
                    </ul>
                    <h4>Filter by Price Range</h4>
                    <div>
                        <RadioBox
                            prices={prices}
                            handleFilters={filters =>
                                handleFilters(filters, "price")
                            }
                        />
                    </div>
                </div>

                <div className="col-5 col-10">
                    <h3 className="product-center mb-1">Products</h3>
                    
                    <hr />
                    <div className="row">
                        {filteredResults.map((product, i) => (
                            <Card key={i} product={product} />
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>

        </Layout>
    );
};

export default Shop;
