// Import Dependencies
let url = require('url');
const MongoClient = require('mongodb').MongoClient;
// Create cached connection variable
let cachedDb = null;
const legacyModifiers = { useUnifiedTopology: true,useNewUrlParser: true  };
// A function for connecting to MongoDB,
// taking a single para-mater of the connection string
async function connectToDatabase() {
    // If the database connection is cached,
    // use it instead of creating a new connection
    if (cachedDb) {return cachedDb}
    // If no connection is cached, create a new one
    const client = await MongoClient.connect(process.env.DigitMongoRetrievalAccess,legacyModifiers)
    // Select the database through the connection,
    // using the database path of the connection string
    const db = await client.db(url.parse(connectionString).pathname.substr(1))
    // Cache the database connection and return the connection
    cachedDb = db
    return db
}

module.exports = connectToDatabase;