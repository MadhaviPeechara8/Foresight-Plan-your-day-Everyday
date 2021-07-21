//create mini express app
const exp = require('express')
const userApi = exp.Router();
const expressErrorHandler = require("express-async-handler")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const multerObj=require("./middlewares/multerCloudinary")

//add body parsing middleware
userApi.use(exp.json())



//import MongoCLient
const mc = require("mongodb").MongoClient;



//connection string
const databaseUrl = DatabaseUrl;

//const databaseUrl="mongodb://<username>:<password>@cluster0-shard-00-00.rjvoz.mongodb.net:27017,cluster0-shard-00-01.rjvoz.mongodb.net:27017,cluster0-shard-00-02.rjvoz.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

let userCollectionObj;
let onlineclscollectionObj;
let todocollectionObj;
let webinarcollectionObj;

//connect to DB
mc.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log("err in db connection", err);
    }
    else {
        //get database object
        let databaseObj = client.db("foresight")
        //create usercollection object

        userCollectionObj = databaseObj.collection("usercollection")
        onlineclscollectionObj=databaseObj.collection("onlineclassescollection")
        todocollectionObj=databaseObj.collection("todocollection")
        webinarcollectionObj=databaseObj.collection("webinarcollection");
        timetablecollectionObj=databaseObj.collection("timetablecollection");
        console.log("connected to database")

    }
})




//http://localhost:3000/user/getusers
//get users
userApi.get("/getusers", expressErrorHandler(async (req, res) => {

    let userList = await userCollectionObj.find().toArray()
    res.send({ message: userList })

}))





//get user by username
userApi.get("/getuser/:username", expressErrorHandler(async (req, res, next) => {

    //get username from url
    let un = req.params.username;
    //search
    let userObj = await userCollectionObj.findOne({ username: un })

    if (userObj === null) {
        res.send({ message: "User not existed" })
    }
    else {
        res.send({ message: userObj })
    }
}))



//create user
userApi.post("/createuser", expressErrorHandler(async (req, res, next) => {
    //get user obj
    let newUser = req.body;
    //search for existing user
    let user = await userCollectionObj.findOne({ username: newUser.username })
    //if user existed
    if (user !== null) {
        res.send({ message: "User already existed" });
    }
    else {
        if(newUser.password!=newUser.cpassword){
            res.send({ message: "Make sure password and confirm password should be same" });
        }
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        let chashedPassword = await bcryptjs.hash(newUser.cpassword, 7)
        //replace password
        newUser.password = hashedPassword;
        newUser.cpassword=chashedPassword;
        //insert
        await userCollectionObj.insertOne(newUser)
        res.send({ message: "User created" })
    }
}))


//user login
userApi.post('/login', expressErrorHandler(async (req, res) => {

    //get user credetials
    let credentials = req.body;
    //search user by username
    let user = await userCollectionObj.findOne({ username: credentials.username })
    //if user not found
    if (user === null) {
        res.send({ message: "invalid username" })
    }
    else {
        //compare the password
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if not matched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create a token
            let signedToken = jwt.sign({ username: credentials.username }, 'abcdef', { expiresIn: 120 })
            //send token to client
            res.send({ message: "login success", token: signedToken, username: credentials.username, userObj: user })
        }

    }

}))


userApi.get("/getclass/:username", expressErrorHandler(async (req, res, next) => {
    //get username from url
    let un = req.params.username;
    //search
    let clsObj = await onlineclscollectionObj.find({ username: un }).toArray();

    if (clsObj === null) {
        res.send({ message: "Onlines class empty" })
    }
    else {
        res.send({ message: clsObj })
    }
}))
//get todo
userApi.get("/gettodo/:username", expressErrorHandler(async (req, res, next) => {
    //get username from url
    let un = req.params.username;
    //search
    let clsObj = await todocollectionObj.find({ username: un }).toArray();

    if (clsObj === null) {
        res.send({ message: "Onlines class empty" })
    }
    else {
        res.send({ message: clsObj })
    }
}))

//get webinar
userApi.get("/getwebinar/:username", expressErrorHandler(async (req, res, next) => {
    //get username from url
    let un = req.params.username;
    //search
    let clsObj = await webinarcollectionObj.find({ username: un }).toArray();
    console.log(clsObj)

    if (clsObj === null) {
        res.send({ message: "Webinar class empty" })
    }
    else {
        res.send({ message: clsObj })
    }
}))

userApi.post("/addOnlinecls",expressErrorHandler(async (req,res,next)=>{
    //get user obj
    let newcls = req.body;
        //insert
        await onlineclscollectionObj.insertOne(newcls)
        res.send({ message: "Class created" })
}))
userApi.post("/addtodo",expressErrorHandler(async (req,res,next)=>{
    //get user obj
    let newcls = req.body;
        //insert
        await todocollectionObj.insertOne(newcls)
        res.send({ message: "Class created" })
}))

userApi.post("/addwebinar",expressErrorHandler(async (req,res,next)=>{
    //get user obj
    let newcls = req.body;
        //insert
        await webinarcollectionObj.insertOne(newcls)
        res.send({ message: "Class created" })
}))

userApi.put("/updateclass", expressErrorHandler(async (req, res, next) => {
    //get modified user
    let modifiedUser = req.body;
    let cls=modifiedUser.ClassName;
    console.log(modifiedUser)
    //update
    //{$and:[{cls:{$eq:modifiedUser.ClassName}},{username:{$eq:modifiedUser.username}}]}
    await onlineclscollectionObj.deleteOne({$and:[{username:{$eq:modifiedUser.username}},{ClassName:{$eq:modifiedUser.ClassName}}]})
    await onlineclscollectionObj.insertOne(modifiedUser)
    //send res
    let clsObj = await onlineclscollectionObj.find({ username: modifiedUser.username }).toArray();
    console.log(clsObj)
    res.send({ message: "Class modified" })

}))


userApi.put("/deleteclass", expressErrorHandler(async (req, res) => {
    //get username from url
    let modifiedUser = req.body;
    let cls=modifiedUser.ClassName;
    console.log(modifiedUser)
    //update
    //{$and:[{cls:{$eq:modifiedUser.ClassName}},{username:{$eq:modifiedUser.username}}]}
    await onlineclscollectionObj.deleteOne({$and:[{username:{$eq:modifiedUser.username}},{ClassName:{$eq:modifiedUser.ClassName}}]})
    //send res
    let clsObj = await onlineclscollectionObj.find({ username: modifiedUser.username }).toArray();
    console.log(clsObj)
    res.send({ message: "Class Deleted" })
}))
userApi.put("/deletetodo", expressErrorHandler(async (req, res) => {
    //get username from url
    let modifiedUser = req.body;
    let cls=modifiedUser.Task;
    console.log(modifiedUser)
    //update
    //{$and:[{cls:{$eq:modifiedUser.ClassName}},{username:{$eq:modifiedUser.username}}]}
    await todocollectionObj.deleteOne({$and:[{username:{$eq:modifiedUser.username}},{Task:{$eq:modifiedUser.Task}}]})
    //send res
    let clsObj = await todocollectionObj.find({ username: modifiedUser.username }).toArray();
    console.log(clsObj)
    res.send({ message: "Class Deleted" })
}))

userApi.put("/deletewebinar", expressErrorHandler(async (req, res) => {
    //get username from url
    let modifiedUser = req.body;
    let cls=modifiedUser.WebinarName;
    console.log(modifiedUser)
    //update
    //{$and:[{cls:{$eq:modifiedUser.ClassName}},{username:{$eq:modifiedUser.username}}]}
    await webinarcollectionObj.deleteOne({$and:[{username:{$eq:modifiedUser.username}},{WebinarName:{$eq:modifiedUser.WebinarName}}]})
    //send res
    let clsObj = await webinarcollectionObj.find({ username: modifiedUser.username }).toArray();
    console.log(clsObj)
    res.send({ message: "Class Deleted" })
}))

userApi.put("/deletetimetable", expressErrorHandler(async (req, res) => {
    //get username from url
   // console.log("hello");
    //console.log("req.body",req.body.productImage)
    //console.log("req.body un",req.body.username)
    //console.log("in js tt",modifiedUser)
    //update
    //{$and:[{cls:{$eq:modifiedUser.ClassName}},{username:{$eq:modifiedUser.username}}]}
    await timetablecollectionObj.deleteOne({$and:[{username:{$eq:req.body.username}},{productImage:{$eq:req.body.productImage}}]})
    //send res
    //console.log("dete")
    let clsObj = await timetablecollectionObj.find({ username: un }).toArray();
    console.log(clsObj)
    res.send({ message: "Time table Deleted" })
}))

userApi.post("/addtt",multerObj.single('photo'),expressErrorHandler(async(req,res,next)=>{
    let newProduct = JSON.parse(req.body.userObj);
    //search
    let product=await timetablecollectionObj.findOne({username:newProduct.username})

    if(product!==null){
        res.send({message:"Product already existed"})
    }else{
        newProduct.productImage=req.file.path;
        delete newProduct.photo;
        await timetablecollectionObj.insertOne(newProduct);
        res.send({message:"New Product added"})
    }
}))


//to read all products
userApi.get("/gettimetable/:username", expressErrorHandler(async (req, res, next) => {
    let un = req.params.username;
    //search
    let tt = await timetablecollectionObj.find({ username: un }).toArray();

    res.send({ message: tt })

}))

//export
module.exports = userApi;
