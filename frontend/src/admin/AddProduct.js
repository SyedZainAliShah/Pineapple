import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        categories: [],
        category: "",
        delivery: "",
        quantity: "",
        photo: "",
        loading: false,
        error: "",
        createdProduct: "",
        redirectToProfile: false,
        formData: ""
    });

    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        price,
        categories,
        category,
        delivery,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    //loading categories and setting form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: "", loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    photo: "",
                    price: "",
                    quantity: "",
                    loading: false,
                    delivery: "",
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>


            <div className="form-group">
                <label className="text-muted mt-3">Name</label>
                <input
                    onChange={handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <div className="form-group">
                <label className="text-muted mt-3">Description</label>
                <textarea
                    onChange={handleChange("description")}
                    className="form-control"
                    value={description}
                />
            </div>

            <div className="form-group">
                <label className="text-muted mt-3">Price</label>
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    value={price}
                />
            </div>

            <div className="form-group">
                <label className="text-muted mt-3">Category</label>
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                >
                <option>Select a Category</option>

                    {categories && categories.map((c,i)=>(<option key={i} value={c._id}>{c.name}</option>))}

                </select>
            </div>

            <div className="form-group">
                <label className="text-muted mt-3">Delivery</label>
                <input
                    onChange={handleChange("delivery")}
                    type="number"
                    className="form-control"
                    value={delivery}
                >
                </input>
            </div>

            <div className="form-group">
                <label className="text-muted mt-3">Quantity</label>
                <input
                    onChange={handleChange("quantity")}
                    type="number"
                    className="form-control"
                    value={quantity}
                />
            </div>

            <h4 className="mt-3">Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-outline-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                    />
                </label>
            </div>

            <button className="btn btn-outline-success btn-block btn-lg mt-5">Create Product</button>
        </form>
    );

    const showError = () => (
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showSuccess = () => (
        <div
            className="alert alert-info"
            style={{ display: createdProduct ? "" : "none" }}
        >
            <h3>The Product "{`${createdProduct}`}" has been created!</h3>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h3>Loading...</h3>
            </div>
        );


    return (
        <Layout
            title="Add a new product"
            description={`Hey ${user.name}, ready to add a new product?`}
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
