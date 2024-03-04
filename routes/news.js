
const express = require('express')
const axios = require('axios')
const newsr=express.Router()
const moment = require('moment')
const math = require('math')


newsr.get('/',async(req,res)=>{
    try {
        const search = req.query.search || "general"
        const begin = "2024-02-21"
        const end = "2024-02-26"
        var url = `https://newsapi.org/v2/everything?q=${search}&from=${begin}&to=${end}&sortBy=popularity&apiKey=8200207d22d148b596df946f1e4ff792`
        const news_get =await axios.get(url)

        
        res.render('news',{articles:news_get.data.articles})

    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})

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
        res.render('news',{articles:news_get.data.articles})
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
        res.render('category',{articles:news_get.data.articles})

    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})

newsr.get

module.exports=newsr