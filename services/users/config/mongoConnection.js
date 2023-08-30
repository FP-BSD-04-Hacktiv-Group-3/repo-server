const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_ATLAS_URI;
const client = new MongoClient(uri);
let db;

async function mongoConnection() {
  try {
    await client.connect();
    db = client.db("Tacotta");

    return db;
  } catch (error) {
    await client.close();
  }
}

function getDB() {
  return db;
}

mongoConnection();
module.exports = {
  mongoConnection,
  db,
  getDB,
};
