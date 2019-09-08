const
    logParams = require('../log-params'),
    connectToDatabase = require('../_mongoClient'),
    paramsetLookup = require('../param-set.json'),
    ID = require('../find-objid');

async function Retrieve(...RetrieveParams) {
    const
        res = RetrieveParams[1],
        { lookupKey } = RetrieveParams[0], // produces the key for param-set.json lookup
        { collectionName, useUri, databaseName, documentId } =
            paramsetLookup.filter(entry => entry.setId === lookupKey)[0].params;
     logParams(lookupKey,collectionName, useUri, databaseName, documentId)

    try {
        // if no document is specified use blank object and find collection method 
        // otherwise lookup document id using find one collection method
        
        const findDocument = documentId === 'none' ? {} : { _id: ID(documentId)};

        // Get a database connection, cached or otherwise
        const
            db = await connectToDatabase(useUri), // using the connection string environment variable as the argument
            collection = await db.collection(collectionName), // Select the "users" collection from the database
            table = await collection.find(findDocument).toArray() // Select the users collection from the database
        res.status(200).json({ table }); // Respond with a JSON string of all users in the collection 
        console.log('|- ->> SUCCESS: ',new Date().toTimeString());
    } catch (err) {
        console.error("GET ERROR", err);
        res.status(500).send(`<div>${err}</div>`);
        console.log('|- -<< ERROR: ',new Date().toTimeString());
    }
}

module.exports = Retrieve;