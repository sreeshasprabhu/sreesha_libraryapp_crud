const express= require('express');
const addbookRouter=express.Router();
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
    
    addbookRouter.get('/',function(req,res){
        res.render("addbook",
        {
            
            nav1,
            title:'Library',
            
    
        });
    });
    addbookRouter.post('/add',upload.single('image'),function(req,res){
        console.log(req.file)
       var item = { 
        // title:req.query.title,
        // genre:req.query.genre,
        // author:req.query.author,
        // image:req.query.image
         title:req.body.title,
        genre:req.body.genre,
        author:req.body.author,
         image:req.file.filename
       
        
       }
      var book= Bookdata(item);
      book.save();
      res.redirect('/books');
            
        });
    
    return addbookRouter;
}

// module.exports=booksRouter;
module.exports=router;