const       express         =require("express"),
            fileupload      =require("express-fileupload"),
            bodyparser      =require("body-parser"),
            mysql           =require("mysql"),
            path            =require("path"),
            app             =express(),
            port            =3000;
app.set("port",process.env.port || port);
console.log("main path="+__dirname);
app.set("views",__dirname+"/views"); 
app.set("view engine","ejs") 

app.use(bodyparser.urlencoded({extended:false})); //url
app.use(bodyparser.json());  //parser data from client as json
app.use(express.static(path.join(__dirname,'public')));
app.use(fileupload());  //configure file upload

//configure routes for Halls app
const {mainpage} = require("./routes/index");
const {addproductpage,addproduct,editproductpage,editproduct,deleteproduct}
                    =require("./routes/product");

app.get("/", mainpage);
app.get("/add",addproductpage);
app.post("/add",addproduct);
app.get("/edit/:id",editproductpage);
app.post("/edit/:id",editproduct);
app.get("/delete/:id",deleteproduct);




//create connection to Database 
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"products"
});
db.connect((err)=>{
        if(err)
        throw err;
        console.log("connection to DB succeded");
    });
global.db = db;
app.listen(port,()=>{
    console.log("server running on port:"+port);
});