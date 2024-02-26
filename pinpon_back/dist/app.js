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
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('pinpon', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
const app = (0, express_1.default)();
const port = 3000;
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("toteeeeeo");
        try {
            yield sequelize.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
app.get('/', (req, res) => {
    res.send('Hello World==!');
});
app.listen(port, () => {
    connectDb();
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map