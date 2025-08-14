exports.role=(req,res,next)=>{
    console.log("--------------------------------------");
    console.log("hello middleware");
    next();
}
exports.computer=(req,res,next)=>{
    console.log("I am doing computer science");
    next();
}
let x=5;
exports.math=(req,res,next)=>{
    if(x==5){
        console.log(`${x} is equal to 5`);
    }
    next();
}
exports.handleerror=(err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send({ message: err.message || 'Internal Server Error' });
}