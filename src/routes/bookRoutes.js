const express= require('express');
const booksRouter=express.Router();
var multer  = require('multer')
const path = require('path');
const storage=multer.diskStorage({
    destination: './public/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
 }

})
const upload = multer({ storage: storage })
const Bookdata=require('../model/Bookdata')
function router(nav1){
    // var books=[
    //     {
    //         title:'Tom and Jerry',
    //         author:'Joseph Barbera',
    //         genre:'Cartoon',
    //         img:"tom.jpg"    
    //     },
    //     {  title:'Harry Potter',
    //        author:'J K Rowling',
    //        genre:'Fantasy',
    //        img:"Harry.jpg" 
    //     },
    //     {   title:'Pathummayude Aadu',
    //         author:'Basheer',
    //         genre:'Drama',
    //         img:"Basheer.jpg" 
    //     }
    // ]
    booksRouter.get('/',function(req,res){
        Bookdata.find()
        .then(function(books){
            res.render("books",
        {
            // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
            nav1,
            title:'Library',
            books
    
        });

        })
        
    });
    booksRouter.get('/:id',function(req,res){
        const id=req.params.id;
        Bookdata.findOne({_id:id})
        .then(function(book){
            res.render("book",{
                // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
                nav1,
                title:'Library', 
                book
            })
        })
        
    })
    booksRouter.get('/edit/:id',upload.single('image'),function(req,res){
        const id=req.params.id;
        Bookdata.findOneAndUpdate({_id:id},req.body)
        .then(function(book){
            res.render("updatebook",{
                // nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
                nav1,
                title:'Library', 
                book
            })
        })
        
    })
    booksRouter.post('/edit/:id',upload.single('image'),function(req,res){
        console.log(req.file)
        const id=req.params.id;
        Bookdata.findByIdAndUpdate({_id:id},req.body)
        .then(function(book){
            res.redirect('/books')
            })
        })
        booksRouter.get('/delete/:id',function(req,res){
            const id=req.params.id;
            Bookdata.findByIdAndDelete({_id:id},req.body)
            .then(function(book){
                res.redirect('/books')
            })
            
        })
        
    
    return booksRouter;
}

// module.exports=booksRouter;
module.exports=router;