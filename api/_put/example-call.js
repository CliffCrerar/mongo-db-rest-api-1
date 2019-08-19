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
 
 /*
 
 now dns add cliff-crerar.tech @ MX mail.infinityarc.net 1 && 
 now dns add cliff-crerar.tech @ NS betty.ns.cloudflare.com 5 && 
 now dns add cliff-crerar.tech @ NS clay.ns.cloudflare.com 5

 
 */
 