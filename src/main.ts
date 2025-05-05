import express, { Request, Response } from 'express';
import cors from 'cors';
import { cuentaBancariaRouter } from './routes/index';
import { sequelize } from './database';

const app = express();
const port = 3012;

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
}
testConnection();

const whitelist = ['http://localhost:4200', 'https://miapp.com'];

app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({ mensaje: 'Hola, bienvenido a la API' });
});

app.use('/cuentaBancaria', cuentaBancariaRouter);

app.use((err: Error, req: Request, res: Response, next: Function) => {
  if (err.message === 'No permitido por CORS') {
    res.status(403).send({ mensaje: 'Dominio no autorizado por CORS' });
  } else {
    next(err);
  }
});

app.use((req, res) => {
  res.status(404).send({ mensaje: 'Ruta no encontrada' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
