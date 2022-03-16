const mongoose = require('mongoose');

const db_link = 'mongodb+srv://anuj:wKhB89PCah0r6pC4@cluster0.bp6w1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const connection =()=>{  mongoose.connect(db_link)
       .then(function (db) {
            console.log("Db connected");
        })
        .catch(function (err) {
            console.log(err);
        });

    }


module.exports = connection;