"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const pg_1 = require("pg");
// Usually you should store these in environment variables and hardcode them here
// for the sake of simplicity I'm hardcoding them here for now
const pool = new pg_1.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_management',
    password: 'aa11ss22dd33',
    port: 5432,
});
// This function will query the database and return the result
const query = (text, params) => {
    return pool.query(text, params);
};
exports.query = query;
