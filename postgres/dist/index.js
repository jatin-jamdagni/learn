"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const pg_1 = require("pg");
// const app = express();
// const port = 3000;
// PostgreSQL connection setup
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password',
    port: 5432,
});
pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err.stack);
    }
    else {
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
function insertUser(_a) {
    return __awaiter(this, arguments, void 0, function* ({ username, email, password }) {
        try {
            const result = yield pool.query("INSERT INTO users (username, email, password) values ($1, $2, $3)", [username, email, password]);
            return result;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    });
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
