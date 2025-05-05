import { cuentaBancaria } from '../../models/cuentaBancariaModel';

export const cuentaBancariaController = {
  async create(nombre: string, saldo: number, activo: boolean): Promise<any> {
    return await cuentaBancaria.create({ nombre, saldo, activo });
  },

  async list(): Promise<any> {
    return await cuentaBancaria.findAll();
  },

  async find(nombre: string): Promise<any> {
    return await cuentaBancaria.findAll({ where: { nombre } });
  },

  async delete(nombre: string): Promise<number> {
    return await cuentaBancaria.destroy({ where: { nombre } });
  }
};