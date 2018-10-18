const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/users';

module.exports = {
    create: function({username, password, stuId, tel, email}) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db('users');
            dbo.collection('users').insertOne({username, password, stuId, tel, email}, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },
    query: function(username, next) {
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let dbo = db.db('users');
            dbo.collection('users').find({username}).toArray(function(err, res) {
                if (err) throw err;
                next(res);
                db.close();
            });
        });
    }
};