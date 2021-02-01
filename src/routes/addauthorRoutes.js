const express= require('express');
const addauthorRouter=express.Router();
var multer  = require('multer')
const path = require('path');
const storage=multer.diskStorage({
    destination: './public/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
 }

})
const upload = multer({ storage: storage })
const Authordata=require('../model/Authordata');
function router(nav1){
    
    addauthorRouter.get('/',function(req,res){
        res.render("addauthor",
        {
            
            nav1,
            title:'Library',
            
    
        });
    });
    addauthorRouter.post('/add',upload.single('image'),function(req,res){
       console.log(req.file)
       var item1 = { 
        // title:req.query.title,
        // genre:req.query.genre,
        // author:req.query.author,
        // image:req.query.image
         name:req.body.title,
        genre:req.body.genre,        
         img:req.file.filename
        
       }
      var author= Authordata(item1);
      author.save();
      res.redirect('/authors');
            
        });
    
    return addauthorRouter;
}

// module.exports=booksRouter;
module.exports=router;