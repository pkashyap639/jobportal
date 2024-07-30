const JobListing = require("../models/JobListing");
const User = require("../models/User");

module.exports = {
   


    getHomeContents: async function (req, res){
        console.log("--Accessing getAllJobs");
        try{
            let jobList = await JobListing.find().limit(3); //getting latest 3 jobs for homepage
            let all_locations = await JobListing.distinct('location'); //getting all the locations
            let number_of_users = (await User.find()).length; //getting number of users
            res.render('home.ejs', {alljobs:jobList, all_locations: all_locations, number_of_users: number_of_users})
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

    

   

}