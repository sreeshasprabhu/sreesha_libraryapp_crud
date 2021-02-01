const express= require('express');
const authorsRouter=express.Router();

var multer  = require('multer')
const path = require('path');
const storage=multer.diskStorage({
    destination: './public/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
 }

})
const upload = multer({ storage: storage })
const Authordata=require('../model/Authordata')
function router(nav1){
    // var authors=[
    //     {
    //         name:'William Shakespeare',            
    //         genre:'English playwright',
    //         img:"william.jpg"    
    //     },
    //     {   name:'Emily Dickinson',            
    //         genre:'American poet',
    //         img:"emily.jpg"    
    //     },
    //     {   name:'Charles Dickens',            
    //         genre:'Novelist',
    //         img:"charles.jpg"   
    //     }
    // ]
    authorsRouter.get('/',function(req,res){
        Authordata.find()
        .then(function(authors){
            res.render("authors",
        {
            // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
            nav1,
            title:'Library',
            authors
    
        });
        })
        
    });
    authorsRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Authordata.findOne({_id:id})
        .then(function(author){
            res.render("author",{
                // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
                nav1,
                title:'Library', 
                author
            });  
        })
        
    });
    authorsRouter.get('/edit/:id',function(req,res){
        const id=req.params.id;
        Authordata.findOneAndUpdate({_id:id},req.body)
        .then(function(author){
            res.render("updateauthor",{
                // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
                nav1,
                title:'Library', 
                author
            })
        })
        
    })
    authorsRouter.post('/edit/:id',upload.single('image'),function(req,res){
        const id=req.params.id;
        Authordata.findByIdAndUpdate({_id:id},req.body)
        .then(function(author){
            res.redirect('/authors')
            })
        })
        authorsRouter.get('/delete/:id',function(req,res){
            const id=req.params.id;
            Authordata.findByIdAndDelete({_id:id},req.body)
            .then(function(author){
                res.redirect('/authors')
            })
            
        })
        
    return authorsRouter;
}

// module.exports=booksRouter;
module.exports=router;