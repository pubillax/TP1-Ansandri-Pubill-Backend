"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const cuentaBancariaModel_1 = require("../models/cuentaBancariaModel");
const sequelizeConfig = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'alumno',
    password: 'alumnoipm',
    database: 'cuentaBancaria',
    models: [cuentaBancariaModel_1.cuentaBancaria],
};
exports.sequelize = new sequelize_typescript_1.Sequelize(sequelizeConfig);
