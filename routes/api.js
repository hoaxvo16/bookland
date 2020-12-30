const express = require("express");
const router = express.Router();
const checkExistUsernameController = require("../controllers/api/checkExistUsernameController");
const checkExistEmailController = require("../controllers/api/checkExistEmailController");
const cartApi = require("../controllers/api/cartApi");
const pagingApi = require("../controllers/api/pagingApi");
router.get("/checkExistedUsername/", checkExistUsernameController.checkExistUsername);

router.get("/get-cart", cartApi.getCartInfo);
router.get("/get-cart/user", cartApi.getUserCartInfo);
router.get("/paging", pagingApi.paging);
module.exports = router;
