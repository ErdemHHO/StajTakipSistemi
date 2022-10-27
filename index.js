const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");


// const duyuru=require("./models/duyuru");
//formdan gelen değerlerin okunabilmesi için
app.use(express.urlencoded({ extended: false }));

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use("/admin",adminRoutes);
app.use("/",userRoutes);


app.listen(3000, () => {
    console.log("listening on port 3000");
});
