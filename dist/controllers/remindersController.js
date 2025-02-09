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
exports.deletereminder = exports.updatereminder = exports.getreminder = exports.getreminders = exports.addreminder = void 0;
const db_1 = require("../services/db");
const addreminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { reminder_id, task_id, note_id,reminder_time,repeat_frequency} = req.body;
    try {
        const result = yield (0, db_1.query)('INSERT INTO task_manager.reminders(reminder_id, task_id, note_id, reminder_time, repeat_frequency) VALUES ($1, $2, $3, $4, $5) RETURNING *', [reminder_id, task_id, note_id,reminder_time,repeat_frequency]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addreminder = addreminder;
const getreminders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)('SELECT * FROM task_manager.reminders');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getreminders = getreminders;
const getreminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield (0, db_1.query)('SELECT * FROM task_manager.reminders WHERE reminder_id = $1', [id]);
        if (result.rows.length) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).json({ error: 'reminder not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getreminder = getreminder;
const updatereminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { reminder_id, task_id, note_id,reminder_time,repeat_frequency} = req.body;
    try {
        const result = yield (0, db_1.query)('UPDATE task_manager.reminders SET reminder_id = $1, task_id = $2, note_id = $3 WHERE reminder_id = $4 RETURNING *', [reminder_id, task_id, note_id,reminder_id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updatereminder = updatereminder;
const deletereminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield (0, db_1.query)('DELETE FROM task_manager.reminders WHERE reminder_id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deletereminder = deletereminder;
