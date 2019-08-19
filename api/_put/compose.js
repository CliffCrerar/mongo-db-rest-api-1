


module.exports = composeUpsert(requestBody){
    console.log('requestBody: ', requestBody);
    return {
        (
            {},
            requestBody,
            {
              upsert: true,
              multi: false,
              writeConcern: 1,
              arrayFilters: [ ]
            }
         )
    }
}