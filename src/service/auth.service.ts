import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
//pasarlo a un controll no hace falta service (solo  si no se necesita q sea mas grande)

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const register = async (email: string, password: string) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error('El usuario ya existe');

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });
};

export const login = async (email: string, password: string): Promise<string> => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Contraseña incorrecta');

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return token;
};
