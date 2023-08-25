const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_ATLAS_URI;
const client = new MongoClient(uri);
let db;

async function mongoConnection() {
  try {
    await client.connect();
    // console.log("Connected successfully to server");
    db = client.db("Tacotta");

    return db;
  } catch (error) {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

// GETTER => mereturn data yang terbaru
function getDB() {
  return db;
}

mongoConnection();
module.exports = {
  mongoConnection,
  db,
  getDB,
};
