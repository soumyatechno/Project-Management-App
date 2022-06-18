const express = require('express');
 require('dotenv').config();
 const colors = require('colors');
 const {graphqlHTTP} = require('express-graphql');
const port = process.env.PORT || 2000;
const schema = require('./schema/schema');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors());

// COnnect to database
connectDB();


app.use('/graphql',graphqlHTTP({
 schema,
 graphiql: process.env.NODE_ENV === 'development'
}));



app.listen(port, console.log(`Server is running on port ${port}`));