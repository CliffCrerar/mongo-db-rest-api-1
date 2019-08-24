
module.exports = function(_id){
    return new require('mongodb').ObjectId(_id);
}