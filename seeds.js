var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Plant Hands",
        image: "https://cdn.shopify.com/s/files/1/2468/4011/products/campsite_1_600x.png",
        description: "Come get your daily plant facts from Plant Hands"
    },   
    {
        name: "Bela Cinderella",
        image: "https://cdn.shopify.com/s/files/1/2807/7322/products/red-squirrel-campsite_300x300.jpg",
        description: "Welcome to a very very sassy campground location for all your sassy needs"
    },       
    {
        name: "Chef Curry",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDK_krslk-zr4aiaNi2WR1-H5OBUjIFCipJqjIfPNuftTIjBGh",
        description: "Come get your daily plant facts from Plant Hands"
    }   
];

function seedDB(){
    // remove all campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        }
        else{
            console.log("removed campgrounds");  
            // add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if (err){
                        console.log(err);
                    }
                    else{
                        console.log("added campground");
                        //create comment
                        Comment.create(
                            {
                                text: "WHERE ARE MY PLANT FACTS",
                                author: "Louis"
                            }, 
                            function(err, comment){
                                if (err){
                                    console.log(err);
                                }
                                else{
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comment");
                                }
                            }
                        );
                    }
                });
                
            }); 
        }
    });
    
}

module.exports = seedDB;