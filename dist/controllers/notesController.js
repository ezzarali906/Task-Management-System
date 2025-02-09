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
exports.deletenote = exports.updatenote = exports.getnote = exports.getnotes = exports.addnote = void 0;
const db_1 = require("../services/db");
const addnote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, note_id, task_id} = req.body;
    try {
        const result = yield (0, db_1.query)("INSERT INTO task_manager.notes(content, note_id, task_id) VALUES ($1, $2, $3) RETURNING *", [content, note_id, task_id]);
        res.status(201).json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.addnote = addnote;
const getnotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, db_1.query)('SELECT * FROM task_manager.notes');
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getnotes = getnotes;
const getnote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield (0, db_1.query)('SELECT * FROM task_manager.notes WHERE note_id = $1', [id]);
        if (result.rows.length) {
            res.json(result.rows[0]);
        }
        else {
            res.status(404).json({ error: 'note not found' });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.getnote = getnote;
const updatenote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { content, note_id, task_id} = req.body;
    try {
        const result = yield (0, db_1.query)('UPDATE task_manager.notes SET content = $1, note_id = $2, task_id = $3 WHERE note_id = $4 RETURNING *', [content, note_id, task_id,note_id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updatenote = updatenote;
const deletenote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const result = yield (0, db_1.query)('DELETE FROM task_manager.notes WHERE note_id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deletenote = deletenote;
