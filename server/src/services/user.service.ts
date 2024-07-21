import bcrypt from 'bcrypt';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import { ModelStatic } from 'sequelize';
import User from '../db/models/user';

type UserDTO = {
  name?: string;
  email: string;
  password: string;
};

const { JWT_SECRET } = process.env as { JWT_SECRET: string };

class UserService {
  private model: ModelStatic<User> = User;

  async getAll() {
    try {
      const users = await this.model.findAll();
      return users;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async register({ name, email, password }: UserDTO) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.model.create({
        name,
        email,
        password: hashedPassword,
      });
      return { name: user.name, email: user.email };
    } catch (error) {
      throw new Error('Failed to register user');
    }
  }

  async login({ email, password }: UserDTO) {
    try {
      const user = await this.model.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
      }
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });
      return { user: { name: user.name, email: user.email }, token };
    } catch (error: unknown) {
      throw new Error('Failed to login');
    }
  }
}

export default UserService;
