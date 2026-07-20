const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
// middleware to get body of the response 
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// to use folder as public
app.use(express.static(path.join(__dirname, 'public')))


app.get('/',(req,res)=> res.send('hi im here'))

app.listen(port,()=>{
    console.log(`localhost is listening at ${port}`)
})