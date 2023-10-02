const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.CONNECTION_STRING);
//     console.log(
//       "Database Connection: ",
//       connect.connection.host,
//       connect.connection.name
//     );
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// };


const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}


module.exports = connectToMongoDB;