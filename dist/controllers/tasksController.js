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
exports.deletetask = exports.updatetask = exports.gettask = exports.gettasks = exports.addtask = void 0;
const db_1 = require("../services/db");
const addtask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {


    const { title, description,status,priority} = req.body;
    try {
        const result = yield (0, db_1.query)('INSERT INTO task_manager.tasks(title, description,status,priority) VALUES ($1, $2, $3 ,$4) RETURNING *', [title, description,status,priority]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addtask = addtask;
const gettasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)('SELECT * FROM task_manager.tasks');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.gettasks = gettasks;
const gettask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield (0, db_1.query)('SELECT * FROM task_manager.tasks WHERE task_id = $1', [id]);
        if (result.rows.length) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).json({ error: 'task not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.gettask = gettask;
const updatetask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, description,status,priority } = req.body;
    try {
        const result = yield (0, db_1.query)('UPDATE task_manager.tasks SET title = $1, description = $2 , status = $3 , priority = $4 WHERE task_id = $5 RETURNING *', [title, description,status,priority,id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updatetask = updatetask;
const deletetask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield (0, db_1.query)('DELETE FROM task_manager.tasks WHERE task_id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deletetask = deletetask;
