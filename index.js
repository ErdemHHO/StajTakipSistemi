//express
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');   
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//custom modules
const sequelize = require("./data/db");
const locals = require("./middlewares/locals");
//routes
const komisyonRoutes = require("./routes/komisyon");
const ogretmenRoutes = require("./routes/ogretmen");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");




//middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "hello world",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000*60 
    },
    store:new SequelizeStore({
        db:sequelize
    })
}));


app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use("/komisyon",komisyonRoutes);
app.use("/ogretmen",ogretmenRoutes);
app.use("/admin",adminRoutes);
app.use("/ogrenci",userRoutes);
app.use("/",authRoutes);

app.use(locals);
// (async () => {
//     await sequelize.sync({ alter: true });
//     await dummyData();
// })();


app.listen(3000, () => {
    console.log("listening on port 3000");
});
