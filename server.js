const express = require("express");
const cors = require("cors");
const reuseCon = require("mongo-express-req");
const app = express();
app.use(cors());
app.use(express.json());
app.use( reuseCon("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/mern-11am?retryWrites=true&w=majority") );
app.post("/login",(req,res)=>{
    const connection = req.db;
    const db = connection.db("mern-11am");
    db.collection("login_details").find({"email":req.body.email,"password":req.body.password}).toArray((err,array)=>{
        if(err) throw err;
        else{
            if(array.length>0){
                res.send({"login":"success"})
            }else{
                res.send({"login":"fail"});
            }
        }
    });
});
app.listen(8080,()=>{
    console.log("server listening the port number 8080");
});