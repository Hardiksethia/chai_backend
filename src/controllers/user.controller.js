import { aysncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {User} from "../models/User.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";
import { jwt } from "jsonwebtoken"
import mongoose from "mongoose";



//
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new apiError(500, "Something went wrong while generating referesh and access token")
    }
}

//
const registerUser= aysncHandler(async (req, res)=>{
 // get user details from frontend
 // validation- not empty
 // check if user already exists: username, email
 // check for images, check for avatar
 // upload them to cloudinary, avatar check
 // create user object- creste entry in db
 // remove password and refresh token field from response
 // check for user creation 
 // response return (res)

//
 const {fullname, email, username, password} = req.body
 // console.log("email:", email);


//
 if([fullname, email,username,password].some((field)=>field?.trim()==="")){
                 throw new apiError(400,"all fields are required")
 }

 
//
 const existedUser= await User.findOne({
    $or:[{username},{email}]
})

//
if(existedUser){
    throw new apiError(409,"User with email or username already exists!!")
}

//
const avatarLocalPath= req.files?.avatar[0]?.path;
// const coverImageLocathPath=req.files?.coverImage[0]?.path; // this will give error if coverimage is empty



//
let coverImageLocathPath;
if(req.files && Array.isArray(req.file.coverImage) && req.files.coverImage.length>0){
    coverImageLocathPath=req.files.coverImage[0].path;

}

//
if (!avatarLocalPath) {
    throw new apiError(400,"avatar file is required");
}

//
const avatar= await uploadOnCloudinary(avatarLocalPath)
const coverImage= await uploadOnCloudinary(coverImageLocathPath)



//
if(!avatar){
     throw new apiError(400,"avatar is required");
}

//
const user= await User.create({
    fullname, 
    avatar: avatar.url, 
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password   
})

//
const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
)

//
if(!createdUser)
{
    throw new apiError(500, "something went wrong while registering the user")
}

//
return res.status(201).json(
    new apiResponse(200, createdUser, "user registerd successfully")
)



})

//
const loginUser= aysncHandler(async (req, res)=>{
    // req body -> data
    // username or email
    // find the user
    // password check 
    // access and refresh token
    // send cookie

//
const {email, password, username}=req.body
console.log(email);

//
if(!username && !email)
{
    throw new apiError(400, "username or email required!!")
}

// Here is an alternative of above code based on logic discussed in video:
// if (!(username || email)) {
//     throw new ApiError(400, "username or email is required")
//}

//
const user=await User.findOne({
    $or:[{username}, {email}]
})

//
if (!user)
{
    throw new apiError(404, " user not found!!")
}

//
const isPasswordValid= await user.isPasswordCorrect(password)

//
if(!isPasswordValid)
{
    throw new apiError(401, " Invalid user credentials")
}

//
const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

//
const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

//
const options = {
    httponly: true,
    secure: true
}

//
return res.status(200).cookie("accestoken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
     new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
))

})

//







export {registerUser}