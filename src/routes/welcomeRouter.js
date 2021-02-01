const express= require('express');
const welcomeRouter=express.Router();
function router(nav1){
welcomeRouter.get('/',function(req,res){
    res.render("welcome",
    {
        // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
        nav1,
        title:'Library',
        

    });
});


return welcomeRouter;
}

// module.exports=booksRouter;
module.exports=router;