const connectToDatabase = require('../_mongoClient');
const path = require('path');
const paramsetLookup = require(path.join(__dirname, '../', 'param-set.json'));
const MongoDB = require('mongodb');

console.log('dbClient: ', connectToDatabase);

async function deleteOneRow(...PutParams) {
    try {
        console.log('Delete Params: ', PutParams);
        console.log('RUNNING A DELETE');
        const { lookupKey, delete_record } = PutParams[0], { collectionName, useUri, databaseName, validationAttr } = paramsetLookup.filter(entry => entry.setId === lookupKey)[0].params,
            recordInsert = PutParams[2],
            res = PutParams[1],
            db = await connectToDatabase(useUri), // using the connection string environment variable as the argument
            collection = await db.collection(collectionName), // Select the "users" collection from the database
            result = await collection.deleteOne(where(validationAttr, delete_record)); // Select the users collection from the database
        res.status(200).json({ res: result }); // Respond with a JSON string of all users in the collection
    } catch (err) {
        console.error("DELETE ERROR:", err);
        res.status(500).send(`<div>${err}</div>`).end();
    }

    // Defines what to delete
    function where(key, value) {
        switch (key) {
            case "_id":
                return {
                    [key]: new MongoDB.ObjectID(value)
                };
        }
    }

}
module.exports = deleteOneRow;

// console.log('lookupKey: ', lookupKey);
// console.log('documentId: ', documentId);
// console.log('databaseName: ', databaseName);
// console.log('useUri: ', useUri);
// console.log('collectionName: ', collectionName);
// console.log('Entry to PUT: ', PutParams[2]);
// console.log('RetrieveParams[1];: ', RetrieveParams[1]);
// const { collectionName } = RetrieveParams[0];
// console.log('CONNECTION STRING:', process.env.MONGODB_URI_THEMES_ALL);
// console.log('CONNECTION STRING CH :', process.env[useUri]);