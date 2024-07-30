const JobListing = require("../models/JobListing");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = {
    // addJob: async function (req, res){
    //     console.log("--Accessing addJob");
        
    //     try{
    //         const job = new JobListing(req.body);
    //         await JobListing.create(job);
    //         res.status(201).send(job);
    //     } catch (err){
    //         res.status(500).send({error: err.message});
    //     }
    // },
    addJob: async function (req, res) {
        try {
          const { title, email, job_type, description, location, salary, company_name, company_website } = req.body;
          const company_logo = req.file ? req.file.path : '';
    
          const job = new JobListing({
            title,
            email,
            job_type,
            description,
            location,
            salary,
            company_name,
            company_website,
            company_logo
          });
    
          await job.save();
        //   res.status(201).send(job);
          res.redirect('/all-jobs'); // Redirect to /all-jobs on successful job addition
        } catch (err) {
            //need to show the error on the form page
          res.status(500).send({ error: err.message });
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


    getJobById: async function (req, res){
        console.log("--Accessing getJobById");
        try{
            const {id} = req.query; //via GET method (access the URL id param) e.g: http://localhost:3000/jobById?id=66a5c5da6225911fca58fc9e
            let job = await JobListing.findOne({_id: id});
            if (!job) {
                return res.status(404).send({ error: "Job not found" });
            }
            res.render('job.ejs', {job:job})
            // res.status(200).send(job);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    removeJob: async function (req, res){
        console.log("--Accessing removeJob");
        try{
            const {id} = req.body;
            const removed = await JobListing.findOneAndDelete({_id: id});
            if(!removed){
                return res.status(404).send({error: "Job not found"});
            }
            res.status(200).send(removed);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    updateJob: async function (req, res){
        
        console.log("--Accessing updateJob");
        /*
        Mock data
        {
            "id": "66a5c1b638f682d80e3ca577", //it must be as id, and it is parsed later during update query
            "employerId": {"_id":"9"},
            "title": "ooops",
            "description": "A description of the job",
            "location": "Toronto",
            "salary": 100000,
            "wierdParam": "nononono" //ignored
        }
        */
        try{
            const updateResult = await JobListing.findOneAndUpdate({_id: req.body.id}, req.body, {"returnDocument": "after"});
            if(!updateResult) {
                return res.status(404).send({error: "Job not found"});
            }
            res.status(200).send(updateResult);
        }catch (err){
            res.status(500).send({error: err.message});
        }
    }
}