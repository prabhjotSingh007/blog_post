const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const cors = require('cors');

// Adds headers: Access-Control-Allow-Origin: *
app.use(cors({
    origin: "*",
}));

// middleware to get body of the response 
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// to use folder as public
app.use(express.static(path.join(__dirname, 'public')))



const authRoute = require('./routes/auth-route/AuthRoute')
const blogRoute = require('./routes/blog-route/BlogRoute')
const categoryRoute = require('./routes/categoy-route/CategoryRoute')

// 2. Mount the auth router with a path prefix
app.use('/api/vi/auth', authRoute);
// blog route
app.use('/api/vi/blogs', blogRoute);
app.use('/api/vi/category', categoryRoute);



app.get('/', (req, res) => res.send('hi im here'))

app.listen(port, () => {
    console.log(`localhost is listening at ${port}`)
})