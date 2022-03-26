import express from "express";
import dotenv from "dotenv";
import { MongoClien, MongoClient } from "mongodb";
dotenv.config();
const app=express();
app.use(express.json());
const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;

async function createConnection(){
    const client=new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is Connected!!");
    return client;
}
const client=await createConnection();

app.get('/Products',async function(request,response){
    const solution=await client
    .db("b30wd")
    .collection('Products')
    .find({})
    .toArray();
    response.send(solution);
    console.log(solution);
})

app.listen(Port,()=>console.log(`server started in ${PORT}`));

app.get("/Products/:id", async function (request, response) {
    console.log(request.params);
    const { id } = request.params;
    const product = await client
    .db("b30wd")
    .collection("movies")
    .findOne({ id: id });
  product ? response.send(product) : response.status(404).send({ message: "Not Found😮😥" });
});

app.post('/Products', async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await client.db('b30wd').collection('Products').insertMany(data);
    response.send(result);
  });

  app.delete('/Products/:id', async function (request, response) {
    console.log(request.params);
    const { id } = request.params;
    const result = await client
      .db("b30wd")
      .collection('Products')
      .deleteOne({ id: id });
    response.send(result);
  });
  
  app.put('/Products/:id', async function (request, response) {
    console.log(request.params);
    const { id } = request.params;
    const updateData = request.body;
    const result = await client
      .db("b30wd")
      .collection('Products')
      .updateOne({ id: id }, { $set: updateData });
    response.send(result);
  });