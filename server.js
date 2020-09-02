const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db_conn_file = fs.readFileSync('./database.json');
const mysql = require('mysql');
const conf = JSON.parse(db_conn_file);

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
}); 

connection.connect();

app.get('/api/customers', (req, res) => {
    
    connection.query(
        'SELECT * FROM CUSTOMER', (err,rows,fields) => {
            if(err) {
                console.log(err);
                res.send(err);
            } else {    
                res.send(rows);
            }
            
        }
    ); 
});

app.listen(port, () => console.log(`Listening on port ${port}`));

// app.get('/api/customers', (req, res) => {
//     debugger;
//     res.send([
//         {
//             'id': 1,
//             'image': 'https://placeimg.com/64/64/1',
//             'name': '홍길동1',
//             'birthday': '961222',
//             'gender': '남자',
//             'job': '대학생'
//           },
        
//           {
//             'id': 2,
//             'image': 'https://placeimg.com/64/64/2',
//             'name': '홍길동2',
//             'birthday': '980123',
//             'gender': '남자',
//             'job': '대학생'
//           },
        
//           {
//             'id': 3,
//             'image': 'https://placeimg.com/64/64/3',
//             'name': '홍길동3',
//             'birthday': '890709',
//             'gender': '남자',
//             'job': '대학생'
//           }
//     ]) 
// } );

/* app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello Express!'})
} ); */


/* const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello Express!'})
} ); */

/* app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
} ); */

/* app.use('./image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql ='INSERT INTO CUSTOMER VALUES(null, ?,?,?,?,?, now(), 0)';
    let image ='/image' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    
    console.log(image);
    console.log(name);
    console.log(birthday);
    console.log(gender);
    console.log(job);

    let params = [image, name, birthday, gender, job];
    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
            console.log(sql);
        }
    );
});

app.delete('/api/customers/:id', (req,res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id=?';
    let params = [req.params.id];
    connection.query(sql, prams,
        (err, rows, fields) => {
            res.send(res);
        }
    )
}); */



