const { db } = require("../database/db");
const { ObjectID } = require("mongodb");
const fs= require("fs");
const path = require("path"); 
exports.list = async () => {
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({}).toArray();
  return books;
};
exports.get = async id => {
  const bookCollection = await db().collection("Books");
  const book = await bookCollection.findOne({ _id: ObjectID(id) });
  return book;
};

exports.getTotalBooksInDB = async() => 
{
  const bookCollection = await db().collection("Books");
  const result =  await bookCollection.find({}).count();
  return result;
}

exports.getCategoryNameById = async id => 
{
  const categoriesCollection = await db().collection("Category");
  const result = categoriesCollection.findOne({_id: ObjectID(id)});
  return result;
}

exports.getAllCategory  = async() => 
{
  const categoriesCollection = await db().collection("Category");
  const bookCollection = await db().collection("Books");
  const allCategories = await categoriesCollection.find({}).toArray(); 
  for(i=0; i < allCategories.length; i++)
  {
     let currentID = allCategories[i]._id.toString(); 
     allCategories[i].count = await bookCollection.find({category_id: currentID}).count();
  }

 
  return allCategories;
}


// list by categoryID 
exports.listByCategory = async categoryId => 
{
  const bookCollection = await db().collection("Books");
  const books = await bookCollection.find({category_id: categoryId}).toArray(); 
 
  return books; 
}

// get user by ID 
exports.getUserById = async id  => 
{
  const userCollection = await db().collection("registeredUser"); 
  const user = await userCollection.findOne({_id: ObjectID(id)}); 
  return user; 
}
exports.saveImage= async (file,imageName) =>{
  
  var rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath, rawData);
}



exports.editAvatar =  async userObject => 
{
    const userCollection = await db().collection("registeredUser"); 
    const id = userObject.id; 
    let success = false; 

    let existsUser = await userCollection.findOne({_id: ObjectID(id)});
    if(existsUser === null || existsUser === undefined)
    {
      console.log(`Cant find user with id ${id}`); 
      success = false; 
    }
    else{
      userCollection.updateOne(
        {_id: ObjectID(id)}, 
        {
          $set: {
            avatar_image: userObject.avatar_image
          }
        }
      );
      success = true; 
    }
   return success;
}

exports.saveAvatar = async file => 
{
  const oldPath = file.avatarImageInput.path;
  const imageName = file.avatarImageInput.path.split("\\").pop();

  const imageType = file.avatarImageInput.name.split('.').pop();
  const imagePath = `./public/images/userImage/${imageName}.${imageType}`;
  

  let rawData = fs.readFileSync(oldPath);
  fs.writeFileSync(imagePath,rawData); 

  return `${imageName}.${imageType}`;

}

exports.paging = async (page,pageLimit)=>{
  const currentPage = parseInt(page);
  const limit = parseInt(pageLimit);
  const bookCollection = await db().collection("Books");
  const totalBook = await  bookCollection.count();
  const books = await bookCollection.find({}).skip(limit*currentPage-limit).limit(limit).toArray();
  return {books,totalBook};
}
