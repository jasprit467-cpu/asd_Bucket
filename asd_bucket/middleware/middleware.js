let cache={};

function cacheMiddleware(req,res,next){
    let key=req.url;
    let value=cache[key];

    if(cache[key]){
        return res.json(value);
    }
    res.cache=function(data){
        cache[key]=data;
    };
    next();

}
module.exports=cacheMiddleware;