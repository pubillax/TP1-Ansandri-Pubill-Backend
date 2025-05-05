import express, { Request, Response } from 'express';
import { cuentaBancariaController } from '../controllers/cuentaBancaria';
export let cuentaBancariaRouter = express.Router();

function parseBool(value: string): boolean {
  return value.toLowerCase() === 'true';
}

cuentaBancariaRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const cuentas = await cuentaBancariaController.list();
    res.status(200).send(cuentas);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener cuentas.' });
  }
});

cuentaBancariaRouter.post('/create/nombre/:nombre/saldo/:saldo/activo/:activo', async (req: Request, res: Response) => {
  try {
    const { nombre, saldo, activo } = req.params;
    const nueva = await cuentaBancariaController.create(nombre, parseInt(saldo), parseBool(activo));
    res.status(201).send(nueva);
  } catch (error) {
    res.status(400).send({ error: 'Error al crear cuenta.' });
  }
});

cuentaBancariaRouter.get('/find/nombre/:nombre', async (req: Request<{ nombre: string }>, res: Response) => {
  try {
    const cuentas = await cuentaBancariaController.find(req.params.nombre);
    res.status(200).send(cuentas);
  } catch (error) {
    res.status(500).send({ error: 'Error al buscar cuenta.' });
  }
});

cuentaBancariaRouter.delete('/delete/nombre/:nombre', async (req: Request<{ nombre: string }>, res: Response) => {
  try {
    const cantidad = await cuentaBancariaController.delete(req.params.nombre);
    if (cantidad === 0) {
      res.status(404).send({ mensaje: 'Cuenta no encontrada.' });
    } else {
      res.status(200).send({ mensaje: 'Cuenta eliminada correctamente.' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error al eliminar cuenta.' });
  }
});