import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.posts('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

export default routes;

// rota teste
// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Cristiane Faria',
//     email: 'cristiane@bitup.com.br',
//     password_hash: '20934839048',
//   });
//   return res.json(user);
// });
