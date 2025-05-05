import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { cuentaBancaria } from '../models/cuentaBancariaModel';

const sequelizeConfig: SequelizeOptions = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'alumno',
    password: 'alumnoipm', 
    database: 'cuentaBancaria',
    models: [cuentaBancaria], 
};

export const sequelize = new Sequelize(sequelizeConfig);