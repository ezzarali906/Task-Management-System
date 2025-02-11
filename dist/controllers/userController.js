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
exports.deleteuser = exports.updateuser = exports.getuser = exports.getusers = exports.adduser = void 0;
const db_1 = require("../services/db");
const adduser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {


    const {email,pass_word,user_role} = req.body;
    try {
        const result = yield (0, db_1.query)('INSERT INTO task_manager.users(email, pass_word, user_role) VALUES ($1, $2, $3) RETURNING *', [email,pass_word,user_role]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.adduser = adduser;
const getusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)('SELECT * FROM task_manager.users');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getusers = getusers;
const getuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield (0, db_1.query)('SELECT * FROM task_manager.users WHERE user_id = $1', [id]);
        if (result.rows.length) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).json({ error: 'user not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getuser = getuser;
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, description,user_role} = req.body;
    try {
        const result = yield (0, db_1.query)('UPDATE task_manager.users SET email = $1, pass_word = $2 user_role = $3 WHERE user_id = $4 RETURNING *', [title, description,user_role,id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updateuser = updateuser;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield (0, db_1.query)('DELETE FROM task_manager.users WHERE user_id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteuser = deleteuser;
