const express = require("express");
const router = express.Router();

const { create, categoryById, read, update, remove, list } = require("../controllers/category");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/category/:categoryId", read); // get details
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create); // create
router.put("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, update); //update
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, remove); //delete
router.get("/categories", list); // present list of all categories

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
