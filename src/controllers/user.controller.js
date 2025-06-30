import { aysncHandler } from "../utils/asyncHandler.js";
import {apiError} from "../utils/apiError.js"
import {User} from "../models/User.model.js"



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
req.files

})




export {registerUser}