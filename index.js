import express from "express"
import bodyParser from "body-parser";

const app=express();
const port=3000;
let posts=[];
// let PostText="";
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.get("/createpost",(req,res)=>{
    res.render("createpost.ejs");
   
});

app.post("/feed",(req,res)=>{
   
    posts.push( req.body["UserText"]);
    res.render("feed.ejs",{postFeed : posts});
});

app.post("/delete",(req,res)=>{
    const ind=parseInt(req.body.index);
    if(!isNaN(ind)){
        posts.splice(ind,1);
    }
    res.redirect("/feed");
});

app.get("/feed",(req,res)=>{
    res.render("feed.ejs",{postFeed : posts});
})

app.get("/edit/:index",(req,res)=>{
    const ind=parseInt(req.params.index);
    const existingText=posts[ind];
    res.render("edit.ejs",{ind,existingText});
});

app.post("/edit/:index",(req,res)=>{
    const index=req.params.index;
    const updatedText=req.body.updatedText;
    if(!isNaN(index) && updatedText!==undefined){
        posts[index]=updatedText;
    }
    res.redirect("/feed");
});
app.listen(port,()=>{
 console.log(`Listening on port ${port}`);
});