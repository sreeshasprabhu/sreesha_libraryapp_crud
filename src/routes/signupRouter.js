const express= require('express');
const signupRouter=express.Router();

    


function router(nav){
    // var Regex = require("regex");
    // var reegex = new Regex(/^[A-Za-z]+$/);

    signupRouter.get('/',function(req,res){
        res.render("signup",{
            nav,
            title:'Library',
            
        });
    });
    signupRouter.post('/',function(req,res){
        const errors = {};
        const firstname=req.body.firstname;
        const lastname=req.body.lastname;
        const email=req.body.email;
        const password=req.body.password;
        const confirm=req.body.confirm;
        const phone=req.body.phone;
       
	
	// if (!String(firstname).trim()) {
    //     errors.firstname = ['Name is required'];
    //     console.log(errors.firstname)             
       
    // }
    
    if (!(/^[A-Za-z]+$/).test(String(firstname))){
        errors.firstname = ['Firstname is not valid'];
        console.log(errors.first)             
        res.render("signup",{
            nav,
            title:'Library'
            
        });
    }

    else if (!(/^\d{10}$/).test(String(phone))){
        errors.phone = ['Phone number is not valid'];
        console.log(errors.phone)             
       
    }
    // else if(!String(password).trim()){
                    
           

    // }
    else if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).test(String(password))){
        errors.password= ['Password must contain  6 to 20 characters one numeric digit, one uppercase and one lowercase letter'];
        console.log(errors.password)
    }
    else if(!(String(password)==String(confirm))){
        errors.password= ['Password does not match'];
       console.log(errors.password)             
           

    }

    else if (!(/^[\-0-9a-zA-Z\.\+_]+@[\-0-9a-zA-Z\.\+_]+\.[a-zA-Z]{2,}$/).test(String(email))) {
        errors.email = ['Email is not valid.'];
        //res.jsonp({success : true})
        console.log(errors.email);
        
    }
    
    
        // console.log(firstname,lastname,password,confirm,phone,email)
        //res.send("form submitted")
        
       // res.send(firstname);
       else{
        // res.render("signin",{
        //     nav,
        //     title:'Library',
             
        
            
        // });
        res.redirect("/signin")
    }
        // console.log(reegex.test(firstname))
             
         
        
       
        
        
    });
    return signupRouter;
}

// module.exports=booksRouter;
module.exports=router;