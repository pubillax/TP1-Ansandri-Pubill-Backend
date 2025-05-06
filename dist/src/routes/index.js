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
exports.cuentaBancariaRouter = void 0;
const express_1 = __importDefault(require("express"));
const cuentaBancaria_1 = require("../controllers/cuentaBancaria");
exports.cuentaBancariaRouter = express_1.default.Router();
function parseBool(value) {
    return value.toLowerCase() === 'true';
}
exports.cuentaBancariaRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cuentas = yield cuentaBancaria_1.cuentaBancariaController.list();
        res.status(200).send(cuentas);
    }
    catch (error) {
        res.status(500).send({ error: 'Error al obtener cuentas.' });
    }
}));
exports.cuentaBancariaRouter.post('/create/nombre/:nombre/saldo/:saldo/activo/:activo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, saldo, activo } = req.params;
        const nueva = yield cuentaBancaria_1.cuentaBancariaController.create(nombre, parseInt(saldo), parseBool(activo));
        res.status(201).send(nueva);
    }
    catch (error) {
        res.status(400).send({ error: 'Error al crear cuenta.' });
    }
}));
exports.cuentaBancariaRouter.get('/find/nombre/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cuentas = yield cuentaBancaria_1.cuentaBancariaController.find(req.params.nombre);
        res.status(200).send(cuentas);
    }
    catch (error) {
        res.status(500).send({ error: 'Error al buscar cuenta.' });
    }
}));
exports.cuentaBancariaRouter.delete('/delete/nombre/:nombre', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cantidad = yield cuentaBancaria_1.cuentaBancariaController.delete(req.params.nombre);
        if (cantidad === 0) {
            res.status(404).send({ mensaje: 'Cuenta no encontrada.' });
        }
        else {
            res.status(200).send({ mensaje: 'Cuenta eliminada correctamente.' });
        }
    }
    catch (error) {
        res.status(500).send({ error: 'Error al eliminar cuenta.' });
    }
}));
