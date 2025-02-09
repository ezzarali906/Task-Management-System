"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesRoutes_1 = __importDefault(require("./routes/notesRoutes"));
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const remindersRoutes_1 = __importDefault(require("./routes/remindersRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Set up the routes for each endpoint.
app.use('/notes', notesRoutes_1.default);
app.use('/tasks', tasksRoutes_1.default);
app.use('/reminders', remindersRoutes_1.default);
exports.default = app;
