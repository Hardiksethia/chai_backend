

// promises method 
const aysncHandler=(requestHandler)=>{
   return (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
    }
}
// as it is a higher order function so we needed to return (above)

export {aysncHandler}


// try catch method 
 /*const aysncHandler= (fn) => async (err, req, res, next) => {
    try{
      await fn(err, req, res, next)
    } catch(error){
        res.status(err.code|| 500).json({
            success: false,
            message: err.message
        })
    }
} */

    