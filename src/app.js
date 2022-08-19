const path=require("path");
const express=require('express');
const hbs=require("hbs");
const geocode =require('./utlis/geocode')
const forecast= require('./utlis/forcecast')



//define paths for express config 
const app=express()//routing of http request 
const port=process.env.PORT || 3000
const publicDirectory=path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views');
const partialPath=path.join(__dirname,'../templates/partials');
//this is the express server

//Setup hanldebars and views locaation 
console.log(__dirname);
console.log(path.join(__dirname, '../public'));
//this provides a path to the current directory 
//static files are not server genrated but sent to the system when asked for the response 
app.set('view engine','hbs')//used to set a key and a value
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve 
app.use(express.static(publicDirectory))//it it used to customise the server


app.get('',(req,res)=>[ 
    res.render('index',{
        title:'Weather App Bitch',
        name:'Hepally'
    })//rander one of the handlebar templates 
])
app.get('/about',(req,res)=>{
    res.render('about',{
        title:"Bitch god going ",
        name:'Hepally'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpfultext:'This is someone helpful stuff',
        title:'Hepally',
        name:'Yashraj soni'
    })
});
app.get('/weather',(req,res)=>{
    if(!req.query.address){//the address is the  value we are assigning from the chrome value
        return res.send({
            error:'Proivde an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{//destructring of the data 
      if(error){
        return res.send({error:error});
      }
      forecast(latitude,longitude,(error,forecastData)=>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })
      })
    })
    
//    res.send({
//     forecast:'It is snowing ',
//     geocode:'Philadephia',
//     address:req.query.address
//    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"

        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
// app.get('',(req,res)=>{
//    res.send("Hello express");this wont work now as the path is found in html 

// })//server us for a specific url 
//server us for a specific url 
// app.get('/about',(req,res)=>{
//    res.send(express.static(path.join(__dirname,'../public/about.html'))) //sending back the json data

// })//server us for a specific url 
//req what we request and res is what is sent back to the resposne 
 

// app.get('/help',(req,res)=>{
//     res.send('You need help suck my cock ');//we are sending back teh ersposne to the help page 

// })
app.get('/help/*',(req,res)=>{
   res.render('404',{
    title:'Andha hai kay lavde',
    name:"Hepallysepian",
    errorMessage:'Bhag yaha se bsdk'
})
})

app.get('*',(req,res)=>{
   res.render('404',{
    title:'404',
    name:'Hepallysepian',
    errorMessage:'Page not found'
   })
})
//why the 404 error comes to the last 

app.listen(port,()=>{
    console.log('Server has started on port '+port);
})
 
//this is an asynrcnous process 
