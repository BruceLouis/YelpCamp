var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var express = require("express");
var app = express();

var User = require("./models/user");
var seedDB = require("./seeds");

var indexRoutes = require("./routes/index");
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//seedDB();
//mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
mongoose.connect("mongodb://brucelouis:whosy0urdaddy@ds121312.mlab.com:21312/yelpcamp", { useNewUrlParser: true });


//passport configuration
app.use(require("express-session")({
    secret: "we are in the campground area",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");   
    res.locals.success = req.flash("success");   
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});