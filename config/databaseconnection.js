const mysql = require('mysql');

//Create Connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'moviedatabase',
    //for typecasting date into string
    dateStrings: true,
    multipleStatements:true
});


//connect 
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Database connected');
});



module.exports = db;

// 
