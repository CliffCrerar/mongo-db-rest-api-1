const connectToDatabase = require('../_mongoClient');
const path = require('path');
const paramsetLookup = require(path.join(__dirname, '../', 'param-set.json'));

console.log('dbClient: ', connectToDatabase);

async function Insert(...PutParams) {
    // console.log('PutParams: ', PutParams);

    const { lookupKey } = PutParams[0];
    const { collectionName, useUri, databaseName, validationAttr, insertOpt } = paramsetLookup.filter(entry => entry.setId === lookupKey)[0].params
    const recordInsert = PutParams[2];

    // console.log('lookupKey: ', lookupKey);
    // console.log('documentId: ', documentId);
    // console.log('databaseName: ', databaseName);
    // console.log('useUri: ', useUri);
    // console.log('collectionName: ', collectionName);
    // console.log('Entry to PUT: ', PutParams[2]);
    // console.log('RetrieveParams[1];: ', RetrieveParams[1]);
    //const { collectionName } = RetrieveParams[0];
    // console.log('CONNECTION STRING:', process.env.MONGODB_URI_THEMES_ALL);
    // console.log('CONNECTION STRING CH :', process.env[useUri]);

    const res = PutParams[1];

    try {
        // Get a database connection, cached or otherwise
        const
            db = await connectToDatabase(useUri), // using the connection string environment variable as the argument
            collection = await db.collection(collectionName); // Select the "users" collection from the database
        //result = await collection.insertOne(recordInsert); // Select the users collection from the database
        // result = await collection.find({
        // [validationAttr]: recordInsert[validationAttr]
        // }).toArray();
        // if (result.length > 0) {
        // throw new Error('Record exists already');
        // } else {
        result = await collection[insertOpt](recordInsert); // Select the users collection from the database
        res.status(200).json({ res: result }); // Respond with a JSON string of all users in the collection
        // }
    } catch (err) {
        console.error("PUT ERROR:", err);
        res.status(500).send(`${err}`).end();
    }
}

module.exports = Insert;