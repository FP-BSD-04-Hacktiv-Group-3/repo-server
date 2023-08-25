require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

// console.log(hash("ajajaja"), "<<<<<< papa");

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_ATLAS_URI;

const client = new MongoClient(uri);

async function seedingUser() {
  try {
    await client.connect();
    // console.log("Connected successfully to server");
    const database = client.db("Tacotta");
    const userCollection = database.collection("profiles");
    const profiles = await userCollection.insertMany([
      {
        username: "gun",
        address: "Mozia",
        phoneNumber: "08123123",
        userId: "64e84db9d1ce431cacb8ecf9",
      },
      {
        username: "al",
        address: "Mozia",
        phoneNumber: "08123123",
        userId: "64e84db9d1ce431cacb8ecfa",
      },
    ]);
    return profiles;
    // const user = await userCollection.findOne();

    // return user;
  } catch (error) {
    console.log(error);
    // Ensures that the client will close when you finish/error
  } finally {
    await client.close();
  }
}

seedingUser().then((data) => {
  console.log(data);
});
