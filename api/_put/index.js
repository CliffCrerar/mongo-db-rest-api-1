const connectToDatabase = require('../_mongoClient');
console.log('dbClient: ', connectToDatabase);

async function InsertOrUpdate(...RetrieveParams) {
    // console.log('RetrieveParams: ', RetrieveParams);
    const { collectionName } = RetrieveParams[0];
    const res = RetrieveParams[1];

    console.log('collectionName: ', collectionName);

    try {
        // Get a database connection, cached or otherwise
        if ([null, undefined, ''].includes([collectionName])) {
            console.error('ERROR MUTHERFUCKER!!!: SHOULD THROW ERROR SLUT FUCKEN POES NAAI!!!!!!');
            throw new Error('Na encoded in string | Include the collectionName=<collection to search>');
        }

        // using the connection string environment variable as the argument
        const db = await connectToDatabase();
        console.log('db: ', db);19

        // Select the "users" collection from the database
        const collection = await db.collection(collectionName);

        // Select the users collection from the database
        const table = await collection.find({}).toArray();

        // Respond with a JSON string of all users in the collection
        res.status(200).json({ table });

    } catch (err) {
        console.error("ERROR", err);
        res.status(500).write(`<div>${JSON.stringify(err)}</div>`).end();
    }
}

module.exports = Retrieve;