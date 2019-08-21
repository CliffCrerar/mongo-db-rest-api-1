const
    path = require('path'),
    connectToDatabase = require('../_mongoClient'),
    paramsetLookup = require(path.join(__dirname,'../','param-set.json'));

async function Retrieve(...RetrieveParams){
    const 
        res = RetrieveParams[1],
        {lookupKey} = RetrieveParams[0],
        {collectionName,useUri,databaseName,documentId} = 
            paramsetLookup.filter(entry => entry.setId === lookupKey)[0].params;
            
        // console.log('lookupKey: ', lookupKey);
        // console.log('documentId: ', documentId);
        // console.log('databaseName: ', databaseName);
        // console.log('useUri: ', useUri);
        // console.log('collectionName: ', collectionName);
        
    try {
        // Get a database connection, cached or otherwise
        const 
            db = await connectToDatabase(useUri), // using the connection string environment variable as the argument
            collection = await db.collection(collectionName), // Select the "users" collection from the database
            table = await collection.find({}).toArray() // Select the users collection from the database
        res.status(200).json({ table }); // Respond with a JSON string of all users in the collection 
    } catch (err) {
        console.error("GET ERROR",err);
        res.status(500).send(`<div>${JSON.stringify(err)}</div>`);
    }
}

module.exports = Retrieve;