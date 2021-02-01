const express= require('express');
const signinRouter=express.Router();
function router(nav){
    
    signinRouter.get('/',function(req,res){
        res.render("signin",
        {
            // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
            nav,
            title:'Library',
            
    
        });
    });
    signinRouter.post('/',function(req,res){
        const errors = {};
        const email=req.body.email;
        const password=req.body.pass;
         if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).test(String(password))){
            errors.password= ['Password must contain  6 to 20 characters one numeric digit, one uppercase and one lowercase letter'];
            console.log(errors.password)
        }
        else if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(email))) {
            errors.email = ['Email is not valid.'];
            //res.jsonp({success : true})
            console.log(errors.email);
            
        }
        else{
        // res.render("books",{
           
        //     nav,
        //     title:'Library', 
            
        // });
        res.redirect("/welcome")
    }
    });
    return signinRouter;
}

// module.exports=booksRouter;
module.exports=router;