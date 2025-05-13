import { Request, Response, NextFunction } from 'express';
import * as authService from '../service/auth.service';
import jwt from 'jsonwebtoken'



export const register = async (req: Request, res: Response) => { // (sacar que sea una constante tienen que ser variables 
  try {
    await authService.register(req.body.email, req.body.password);
    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => { // (que pida variables (topo id:etc))
  try {
    const token = await authService.login(req.body.email, req.body.password);
    res.json({ token });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export interface AuthRequest extends Request 

{
    user?: any; 
  }

  const secretKey = 'tu_clave_secreta';


  export const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
      const token = req.headers['authorization']?.split(' ')[1];
  
      if (!token) {
          return res.status(403).json({ message: 'No token provided' });
      }
  
      try {
          const decoded = jwt.verify(token, 'tu_clave_secreta'); 
          req.user = decoded;
          next();
      } catch (err) {
          return res.status(401).json({ message: 'Invalid or expired token' });
      }
  };
  
