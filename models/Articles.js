var crypto = require("crypto"),
    type = "mongodb",
    client = require("mongodb").MongoClient,
    mongodb_host = "127.0.0.1",
    mongodb_port = "27017",
    collection,
    connection = 'mongodb://';
connection += mongodb_host + ':' + mongodb_port;
connection += '/blog-application';

module.exports = function() {

    client.connect(connection, function(err, database) {
        if (err) {
            throw new Error("Can't connect");
        } else {
            console.log("Connection to MongoDB server successful");
            collection = database.collection('articles');
        }
    });
    return {
        add: function(data, callback) {
            var date = new Date();
            data.id = crypto.randomBytes(20).toString('hex');
            data.date = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
            collection.insert(data, {}, callback || function() {});
        },
        update: function(data, callback) {
            collection.update({
                    "id": data.id
                }, {
                    text: data.text,
                    title: data.title,
                    id: data.id
                }, {},
                callback || function() {});
        },
        get: function(callback) {
            collection.find({}).toArray(function(err, rows) {
                callback(rows);
            });
        },
        remove: function(id, callback) {
            collection.findAndModify({
                    id: id
                }, [], {}, {
                    remove: true
                },
                callback);
        }
    }
}