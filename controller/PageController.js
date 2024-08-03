const JobListing = require("../models/JobListing");
const User = require("../models/User");

module.exports = {
   


    getHomeContents: async function (req, res){
        console.log("--Accessing getAllJobs");
        try{
            let jobList = await JobListing.find().limit(3).sort({ listingDate: -1 }); //getting latest 3 jobs for homepage //need fixing
            let all_locations = await JobListing.distinct('location'); //getting all the locations
            let number_of_users = (await User.find()).length; //getting number of users
            let number_of_alljobs = (await JobListing.find()).length;
            res.render('home.ejs', {alljobs:jobList, all_locations: all_locations, number_of_users: number_of_users, number_of_alljobs: number_of_alljobs})
            // res.status(200).send({alljobs:jobList});
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    getAllJobs: async function (req, res){
        console.log("--Accessing getAllJobs");
        try{
            let jobList = await JobListing.find();
            let all_locations = await JobListing.distinct('location'); //getting all the locations
            res.render('jobs.ejs', {alljobs:jobList, all_locations: all_locations})
            // res.status(200).send({alljobs:jobList});
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    about: function(req, res){
        res.render("about.ejs");
    },
    postNewJob: function(req, res){
        res.render("job-form.ejs");
    },
    loginPage: function(req, res){
        res.render("login.ejs");
    },
    signupPage: function(req, res){
        res.render("signup.ejs");
    },
    profile: function(req, res){
        res.render("profile.ejs");
    },
    profile: async function (req, res){
        try{
            const {username} = req.query; //via GET method (access the URL id param) e.g: http://localhost:3000/jobById?id=66a5c5da6225911fca58fc9e
            let user = await User.findOne({username: username});
            if (!user) {
                return res.status(404).send({ error: "User Not Found" });
            }
            res.render('profile.ejs', {user:user})
            // res.status(200).send(job);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    

   

}