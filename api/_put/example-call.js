db.collection.update(
    <query>,
    <update>,
    {
      upsert: <boolean>,
      multi: <boolean>,
      writeConcern: <document>,
      collation: <document>,
      arrayFilters: [ <filterdocument1>, ... ],
      hint:  <document|string>        // Available starting in MongoDB 4.2
    }
 )