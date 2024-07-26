const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://pkashyap148:jobpassword@jobportal.icauweq.mongodb.net/?retryWrites=true&w=majority&appName=jobportal";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// mongodb+srv://pkashyap148:<password>@jobportal.icauweq.mongodb.net/

"resume": {
    "resume_id": ObjectId("60d5ec49f56e500a3c8e4f04"),
    "file_url": "http://example.com/resume/jobseeker1.pdf",
    "skills": ["JavaScript", "Node.js", "MongoDB"],
    "experience": [
      {
        "company": "TechCorp",
        "position": "Software Developer",
        "duration": "2 years"
      },
      {
        "company": "WebSolutions",
        "position": "Frontend Developer",
        "duration": "1.5 years"
      }
    ],
    "education": [
      {
        "institution": "University of Example",
        "degree": "Bachelor of Science in Computer Science",
        "year": 2020
      }
    ]
  }