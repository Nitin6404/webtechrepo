const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// connecting db 
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_name
})

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});

// routes
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the server'
    })
});

app.post('/submit_form', (req, res) => {
    const { 
        name, 
        rollno,       // Correct the key to match the form field
        email, 
        phone,        // Changed from phone_no to match the form field
        father_name, 
        mother_name, 
        year, 
        nationality, 
        gender 
    } = req.body;

    const sql = 'INSERT INTO form_data (name, roll_no, email, phone_no, father_name, mother_name, year, nationality, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [name, rollno, email, phone, father_name, mother_name, year, nationality, gender], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Form submitted successfully!' });
    });
});


app.listen(3000, () => {
    console.log('server is running on port 3000');
})
