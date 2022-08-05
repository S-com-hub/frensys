var mysql = require('mysql');
const con = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'android-admin-panel'
})
con.getConnection((err) => {
    if (err) throw err;
    console.log("Database Connected");
})
module.exports = con;