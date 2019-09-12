import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Cristiane Faria',
    email: 'cristiane@bitup.com.br',
    password_hash: '20934839048',
  });
  return res.json(user);
});

export default routes;
