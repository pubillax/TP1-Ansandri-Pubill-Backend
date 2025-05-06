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
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/index");
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 3012;
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield database_1.sequelize.authenticate();
            console.log('Conexión a la base de datos establecida correctamente.');
        }
        catch (error) {
            console.error('No se pudo conectar a la base de datos:', error);
        }
    });
}
testConnection();
const whitelist = ['http://localhost:4200', 'https://miapp.com'];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    }
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send({ mensaje: 'Hola, bienvenido a la API' });
});
app.use('/cuentaBancaria', index_1.cuentaBancariaRouter);
app.use((err, req, res, next) => {
    if (err.message === 'No permitido por CORS') {
        res.status(403).send({ mensaje: 'Dominio no autorizado por CORS' });
    }
    else {
        next(err);
    }
});
app.use((req, res) => {
    res.status(404).send({ mensaje: 'Ruta no encontrada' });
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
