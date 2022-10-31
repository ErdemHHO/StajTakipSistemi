//express
const express = require("express");
const app = express();

// const cookieParser = require('cookie-parser');
// const session = require('express-session');
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

//custom modules
const sequelize = require("./data/db");

//routes
// const komisyonRoutes=require("./routes/komisyon");
// const ogretmenRoutes = require("./routes/ogretmen");
const komisyonRoutes = require("./routes/komisyon");
const ogretmenRoutes = require("./routes/ogretmen");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");



authRoutes
//middleware
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(session({
//     secret: "hello world",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         maxAge: 1000 * 60 * 60 * 24
//     },
//     store: new SequelizeStore({
//         db: sequelize
//     })
// }));


app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use("/komisyon",komisyonRoutes);
app.use("/ogretmen",ogretmenRoutes);
app.use("/admin",adminRoutes);
app.use("/ogrenci",userRoutes);
app.use("/",authRoutes);



app.listen(3000, () => {
    console.log("listening on port 3000");
});
