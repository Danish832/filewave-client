const express = require('express') ;
const dotenv = require('dotenv');
const path = require('path') ;



const app = express() ;

dotenv.config();

const PORT = process.env.PORT || 4000 ;
const viewsPath = path.join(__dirname,'/views');

app.set("view engine","ejs") ;
app.set("views",viewsPath);
app.use(express.static(path.join(__dirname,'/public')));

app.get("/",(req,res)=>{
    res.render('index');
})





app.listen(PORT,()=>{
    console.log(`Server running in port:${process.env.PORT}`);
})

