const express= require('express');
const app=new express();
const nav= [
    {
        link:'/signup',name:'SignUp'  
    },
    {
        link:'/signin',name:'SignIn'  
        
    },
];
const nav1=[
     {
         link:'/books',name:'Books'
     },
     {
        link:'/authors',name:'Authors'  
    },
    {
        link:'/addbook',name:'Add Book'
    },
    {
        link:'/addauthor',name:'Add Author'
    },
    {
        link:'/',name:'Log Out'
    }
]

const booksRouter=require('./src/routes/bookRoutes')(nav1);
const authorsRouter=require('./src/routes/authorRoutes')(nav1);
const signupRouter=require('./src/routes/signupRouter')(nav);
const signinRouter=require('./src/routes/signinRouter')(nav);
const addbookRouter=require('./src/routes/addbookRouter')(nav1);
const welcomeRouter=require('./src/routes/welcomeRouter')(nav1);
const addauthorRouter=require('./src/routes/addauthorRoutes')(nav1);

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}))
//template engine
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books',booksRouter);
app.use('/authors',authorsRouter);
app.use('/signup',signupRouter);
app.use('/signin',signinRouter);
app.use('/addbook',addbookRouter);
app.use('/welcome',welcomeRouter);
app.use('/addauthor',addauthorRouter);
app.get('/',function(req,res){
    res.render("index",
    {
        //nav:[{link:'/books',name:'Books'},{link:'/authors',name:'Authors'}],
        nav,
        title:'Library'

    })
});
app.listen(3200);