// import express from 'express';
import { Pool } from 'pg';

// const app = express();
// const port = 3000;

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    } else {
        console.log('Connected to the database');
    }
});

// app.get('/', async (req, res) => {
//     try {
//         const result = await pool.query("INSERT INTO users (username, email, password) values ('test3', 'test3@email.com', 'test3')");
//         res.send(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error querying the database');
//     }
// });


async function insertUser ({username, email, password}: {username: string, password:string,email:string }) {
    try {
        const result = await pool.query("INSERT INTO users (username, email, password) values ($1, $2, $3)", [username, email, password]);
        return result;
    } catch (err) {
        console.error(err);
        return err;
    }
}

insertUser({
    username: 'test5',
    email: 'test5@gmail.com',
    password: 'test5'
});


// app.get('/look', async (req, res) => {
//     try {
//         const result = await pool.query("SELECT * FROM users");
//         res.send(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error querying the database');
//     }
// });
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });