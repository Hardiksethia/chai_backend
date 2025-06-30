import { aysncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {User} from "../models/User.model.js"
import {uploadOnCloudinary, upluploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js";



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
 console.log("email:", email);


//
 if([fullname, email,username,password].some((field)=>field?.trim()==="")){
                 throw new apiError(400,"all fields are required")
 }

 
//
 const existedUser= User.findOne({
    $or:[{username},{email}]
})

//
if(existedUser){
    throw new apiError(409,"User with email or username already exists!!")
}

//
const avatarLocalPath= req.files?.avatar[0]?.path;
const coverImageLocathPath=req.files?.coverImage[0]?.path;

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




export {registerUser}