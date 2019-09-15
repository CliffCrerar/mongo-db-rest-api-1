const connectToDatabase = require( '../_mongoClient' );
const path = require( 'path' );
const paramsetLookup = require( path.join( __dirname, '../', 'param-set.json' ) );
const DoRunLog = true;
const fs = require( 'fs' );
const mongo = require( 'mongodb' );
console.log( 'dbClient: ', connectToDatabase );

async function upsertOneRow ( ...PostParams ) {
    // console.log( 'PostParams: ', PostParams );
    let res = PostParams[ 1 ];
    try {
        DoRunLog && runLog( PostParams );
        // DECLARE VARIABLES
        const
            { lookupKey } = PostParams[ 0 ],
            { collectionName, useUri, databaseName, validationAttr } =
                paramsetLookup.filter( entry => entry.setId === lookupKey )[ 0 ].params,
            { _id, Email, FirstName, LastName, Phone, Updated } = PostParams[ 2 ],
            // Get a database connection, cached or otherwise
            db = await connectToDatabase( useUri ), // using the connection string environment variable as the argument
            collection = await db.collection( collectionName ), // Select the "users" collection from the database
            result = await collection.updateOne({ _id: new mongo.ObjectID( _id ) },
                {
                    $set: { 
                        FirstName: FirstName, 
                        FirstName: FirstName,
                        LastName: LastName,
                        Email: Email,
                        Phone: Phone,
                        Updated: new Date().toLocaleString()
                    }
                },
                { upsert: true }
            ); // Select the users collection from the database
        res.status( 200 ).json( { res: result } ); // Respond with a JSON string of all users in the collection
        res.end();
        console.log( '|- ->> SUCCESS: ', new Date().toTimeString() );
    } catch ( err ) {
        //let res = PostParams[ 1 ]
        console.error( "POST ERROR", err );
        res.status( 500 ).send( `<div>${ err }</div>` );
    }
}

function runLog ( par ) {
    // console.log( 'this: ', par );
    const
        { lookupKey } = par[ 0 ],
        { collectionName, useUri, documentId, databaseName, validationAttr, insertOpt } = paramsetLookup.filter( entry => entry.setId === lookupKey )[ 0 ].params,
        recordInsert = par[ 2 ],
        res = par[ 1 ];
    console.log( __dirname );
    fs.appendFileSync( __dirname + '/reqres.log', res, 'utf8' );
    console.log( '/------------- REQUEST VARIABLES LOG --------------/\n' );
    console.log( 'LOOKUP KEY -> ', lookupKey, '\n' );
    console.log( 'DOCUMENT ID ->', documentId, '\n' );
    console.log( 'DATABASE NAME -> ', databaseName, '\n' );
    console.log( 'URI -> ', useUri, '\n' );
    console.log( 'COLLECTION -> ', collectionName, '\n' );
    console.log( 'DATA TO POST -> ', recordInsert, '\n' );
    //console.log( 'RetrieveParams[1];: ', par[ 1 ] );
    // const { collectionName } = RetrieveParams[0];
    console.log( 'CONNECTION STRING -> ', process.env.MONGODB_URI_THEMES_ALL, '\n' );
    console.log( 'CONNECTION STRING ->', process.env[ useUri ], '\n' );
    console.log( '/------------- REQUEST VARIABLES LOG --------------/\n', '\n' );
}

module.exports = upsertOneRow;