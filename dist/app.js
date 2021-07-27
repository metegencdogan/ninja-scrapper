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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scrapper_1 = require("./service/scrapper");
const app = express_1.default();
const PORT = 3000;
app.get('/', (req, res) => {
    res.status(200).send(`app is running on  ${PORT}`);
});
app.get('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let name = req.query.name;
    let sort = req.query.sort;
    let office = req.query.office;
    yield scrapper_1.getEmployees(name, sort, office).then(data => res.status(200).send(data));
}));
app.listen(PORT);
