export default function logger(req,res,next){
    console.log("--------------");
    console.log(req.url);
    console.log(req.method);
    console.log(new Date().toLocaleString());
    next();
}
