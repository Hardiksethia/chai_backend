

// promises method 
const aysncHandler=(requestHandler)=>{
    (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err)=>next(err))
    }
}


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