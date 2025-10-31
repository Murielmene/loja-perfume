const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'escola'
});

db.connect((err) => {
    if (err) {
        console.error('Erro de conexão:', err);
        return;
    }
    console.log('Conectando ao Mysql!');
});
module.exports = db;