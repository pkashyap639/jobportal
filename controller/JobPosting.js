const JobListing = require("../models/JobListing");
const mongoose = require("mongoose");

module.exports = {
    addJob: async function (req, res){
        console.log("--Accessing addJob");
        /*
        Mock data
        {
            "employerId": {"_id":"1"},
            "title": "CO-OP Java Developer",
            "description": "A description of the job",
            "location": "Toronto",
            "salary": 60000
        }
        */
        try{
            const job = new JobListing(req.body);
            await JobListing.create(job);
            res.status(201).send(job);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },


    getAllJobs: async function (req, res){
        console.log("--Accessing getAllJobs");
        try{
            let jobList = await JobListing.find();
            res.status(200).send(jobList);
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
            res.status(200).send(job);
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