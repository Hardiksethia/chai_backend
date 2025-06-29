import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))
// see chai aur code for every code's reason
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"})) // see chai aur code for the reason behind this
app.use(express.static("public"))
app.use(cookieParser())
export {app}




/* What is asyncHandler?
asyncHandler is a higher-order function.
A higher-order function is a function that takes another function as an argument and possibly returns a new function.

Why is asyncHandler needed?
In Express.js, if an asynchronous function throws an error, you need to explicitly pass that error to the next function for the Express error-handling middleware to catch it. Without this, your server might crash or not handle the error properly.

Different Variations 

Version 1: The normal function
const asyncHandler = () => {};
This is a simple function 

Version 2: The higher-order function
const asyncHandler = (func) => {
  return () => {};
};
Takes a function (func) as an argument.
Returns a new function.

Version 3: The higher-order async function
const asyncHandler = (func) => {
  return async () => {};
};
Same as above, but the returned function is asynchronous (async).
Used when the inner function (func) involves asynchronous operations.*/


/* next(err): If an error occurs (the catch block is triggered), next(err) is called with the err argument. This signals to Express that an error occurred, so it should skip all regular middleware functions and proceed directly to error-handling middleware. */


// use npm , express,mongoose, and different documentation , node etc, 