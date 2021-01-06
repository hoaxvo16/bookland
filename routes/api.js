const express = require("express");
const router = express.Router();
const checkExistUsernameController = require("../controllers/api/checkExistUsernameController");
const checkExistEmailController = require("../controllers/api/checkExistEmailController");
const cartApi = require("../controllers/api/cartApi");
const pagingApi = require("../controllers/api/pagingApi");
const getLocationApi = require("../controllers/api/getLocationApi");
const orderApi = require("../controllers/api/orderApi");

router.get("/checkExistedUsername", checkExistUsernameController.checkExistUsername);
router.get("/get-cart", cartApi.getCartInfo);
router.get("/get-cart/user", cartApi.getUserCartInfo);
router.get("/add-book-to-cart/user", cartApi.addBookToCart);
router.get("/del-book-from-cart/user", cartApi.delBookFromCart);
router.get("/update-book-from-cart/user", cartApi.updateBookFromCart);
router.get("/paging", pagingApi.paging);
router.get("/get-city", getLocationApi.getCity);
router.get("/get-district", getLocationApi.getDistrict);
router.post("/add-order", orderApi.addOrder);
router.get("/order", orderApi.getAllOrder);

module.exports = router;
