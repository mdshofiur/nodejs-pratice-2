const express = require('express')
const app = express()
const port = 5000
const { MongoClient } = require('mongodb');
const cors = require('cors')
const ObjectId = require('mongodb').ObjectId


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// MvjUznD911tm6Yd4

const uri = "mongodb+srv://mdshofiur:MvjUznD911tm6Yd4@cluster0.e7yhr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {

  try {
    await client.connect();
    const database = client.db("FoodService");
    const UserCollections = database.collection("FoodUsers");
   

     // Post Api
      app.post('/users', async function (req, res) {
      const newUser = req.body;
      const result = await UserCollections.insertOne(newUser);
      res.json(result)
    })
   


    // get api
    app.get('/users', async (req, res) => {
      const curser  = UserCollections.find({})
      const users = await curser.toArray();
      res.send(users)
     });


     // delete api
     app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await UserCollections.deleteOne(query)
            res.json(result);
     }) 


   // get api for update api
     app.get('/users/:id', async (req, res) => {
          const id = req.params.id;
          const query = {_id: ObjectId(id)};
          const user = await UserCollections.findOne(query)
           res.send(user)
     })

     // update api 
     app.put('/users/:id', async (req, res) => {
          const id = req.params.id;
          const UpdatedUser = req.body;
          const filter = {_id:ObjectId(id)};
          const options = { upsert: true };
          const updateDoc = {
            $set: {
              name: UpdatedUser.name,
              email: UpdatedUser.email
            },
          };
          const result = await UserCollections.updateOne(filter, updateDoc, options);
           res.send(result)
     })


     





  } 
  
  finally {
   // await client.close();
  }

}
run().catch(console.dir);





/* 
 const Unserinformation = {
      name: "Md Shafikur Rahaman",
      study: "Bsc In EEE",
      address: "Dhamari,Dhaka",
      university: "NPI University Of Bangladesh"
    }

    const result = await UserCollections.insertOne(Unserinformation);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
*/


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




