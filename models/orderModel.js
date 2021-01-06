const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const booksModel = require("./booksModel");
const cartModel = require("./cartModel");
exports.getAllOrder = async userId => {
  const orderCollection = await db().collection("UserOrder");
  const orderInfo = await orderCollection.find({ userID: ObjectID(userId) }).toArray();
  let data = [];
  for (const element of orderInfo) {
    const booksInfo = await booksModel.getCartInfo(element.books);
    const temp = {
      books: booksInfo,
      status: element.status,
      createDate: element.create_date,
      orderId: element._id,
    };
    data.push(temp);
  }
  return data;
};

exports.addOrder = async (name, userID, city, district, subDistrict, address) => {
  const booksInUserCart = await cartModel.getUserBookArr(userID);
  const orderCollection = await db().collection("UserOrder");
  const date = new Date();
  await orderCollection.insertOne({
    userID: ObjectID(userID),
    city: city,
    district: district,
    subDistrict: subDistrict,
    address: address,
    name: name,
    books: booksInUserCart,
    create_date: date,
    status: "Chờ giao hàng",
  });
};

exports.getOrderById = async id => {
  const orderCollection = await db().collection("UserOrder");
  const orderInfo = await orderCollection.findOne({ _id: ObjectID(id) });
  const booksInfo = await booksModel.getCartInfo(orderInfo.books);
  const data = {
    books: booksInfo,
    status: orderInfo.status,
    createDate: orderInfo.create_date,
    orderId: orderInfo._id,
  };
  return data;
};
