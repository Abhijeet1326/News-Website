
const express = require('express')
const axios = require('axios')
const newsr=express.Router()
const moment = require('moment')
const math = require('math')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb+srv://news-pulse:news-pulse@cluster0.ldez3vj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const userSchema = mongoose.Schema({
    email: String,
    phone: String,
    password: String
});
const Item = mongoose.model("USer", userSchema);

newsr.get('/login', (req, res) => {
    res.render("login.ejs");
});

newsr.post("/login", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const check = await Item.findOne({email:email});
    const passMatch = await bcrypt.compare(password, check.password);
    console.log(check);
    if(!check){
        return res.status(200).json({message: "Cannot Create  New"});
          
    }
    if(passMatch){
        const show = email.slice(0,1).toUpperCase();
        const search = req.query.search || "general"
        const begin = "2024-02-21"
        const end = "2024-02-26"
        var url = `https://newsapi.org/v2/everything?q=${search}&from=${begin}&to=${end}&sortBy=popularity&apiKey=8200207d22d148b596df946f1e4ff792`
        const news_get =await axios.get(url)

        
        res.render('news',{articles:news_get.data.articles, butt:show});
    }
    else{
        return res.status(300).json({message: "Wrong password New"}); 
    } 
});

newsr.get('/signup', async(req, res) => {
    res.render("signup.ejs",{mess:""});
});

newsr.post("/signup", async(req, res) => {
    const email = req.body.email;
    const phone = req.body.phone;
    const pass = req.body.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);
    const ext = await Item.findOne({email:email});
    if(ext){
        res.render("signup.ejs",{mess:"User Already Exists!!"});
    }
    else{
        await Item.create({
            email:email,
            phone:phone,
            password:hashedPassword
        });
        res.render("login.ejs");
    }
});



newsr.get('/',async(req,res)=>{
    try {
        const search = req.query.search || "general"
        const begin = "2024-02-21"
        const end = "2024-02-26"
        var url = `https://newsapi.org/v2/everything?q=${search}&from=${begin}&to=${end}&sortBy=popularity&apiKey=8200207d22d148b596df946f1e4ff792`
        const news_get =await axios.get(url)

        
        res.render('news',{articles:news_get.data.articles, butt:"Login/SignUp"})

    } catch (error) {
        if(error.response){
            console.log(error);
        }

    }
});



// newsr.get('/login', (req, res) => {
//     res.render('login')
// })

// newsr.post('/login', async(req, res)=> {
//     const search=req.body.search  || "general"
//     const begin = req.body.tripstart
//     const end = req.body.tripend
//     const name = req.body.name
//     const pass = req.body.password
//     var url = `https://newsapi.org/v2/everything?q=${search}&from=${begin}&to=${end}&sortBy=popularity&apiKey=8200207d22d148b596df946f1e4ff792`
//          const news_get = await axios.get(url)
        
//     console.log(name)
//     res.render('news',{articles:news_get.data.articles})
// })

newsr.get('/aboutus', (req,res)=>{
    res.render('aboutus')
});

newsr.get('/agreement', (req,res)=>{
    res.render('agreement')
});

newsr.get('/privacy', (req,res)=>{
    res.render('privacy')
});


newsr.post('/search',async(req,res)=>{
    const search = req.body.search  || "general"
    const begin = req.body.tripstart
    const end = req.body.tripend

    try {
        var url = `https://newsapi.org/v2/everything?q=${search}&from=${begin}&to=${end}&sortBy=popularity&apiKey=8200207d22d148b596df946f1e4ff792`
        const news_get =await axios.get(url)
        res.render('news',{articles:news_get.data.articles, butt:"Login/SignUp"})
    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})

newsr.get('/news/:category',async(req,res)=>{
    var category = req.params.category;
    try {
        var url = 'http://newsapi.org/v2/top-headlines?country=in&category=' + category + '&apiKey=36f3e29b704f41339af8439dc1228334';

        const news_get =await axios.get(url)
        res.render('category',{articles:news_get.data.articles, butt:"Login/SignUp"})

    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})



module.exports=newsr