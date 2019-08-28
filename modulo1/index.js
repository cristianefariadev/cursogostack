const express = require(`express`);

const server = express();

server.use(express.json());

//CRUD - CREATE, READ, UPDATE, DELETE

const users = [`diego`, `claudio`, `cristiane`, 'emily'];

server.use((req, res, next) => {
  console.time('Request');
  console.log('Metodo: ${req.method}; URL: ${req.url}');
  next();
  console.timeEnd('Request');
})

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required' })
  }
  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];
  if (!users[req.params.index]) {
    return res.status(400).json({ error: 'User does not exists' })
  }
  req.user = user;
  return next();
}

//mostrar todos
server.get('/users/', (req, res) => {
  return res.json(users);
})

//mostrar por id
server.get(`/users/:index`, checkUserInArray, (req, res) => {
  //const { index } = req.params;
  //return res.json(users[index]);
  return res.json(req.user);

})

//criar
server.post('/users', checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
})

//editar
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
})

//deletar
server.delete('/users/:index', checkUserInArray, (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  //return res.json(users); retorna a lista apos apagar
  return res.send(); //não retorna nada
})

server.listen(3000);

//request body
//const users = [`diego`, `claudio`, `cristiane`, 'emily'];
//server.get(`/users/`, (req, res) => {
//  const { index } = req.params;
//  return res.json(users[index]);
//})
//Route params
// server.get(`/users/:id`, (req, res) => {
//   const { id } = req.params;
//   return res.json({ message: `Buscando o usuario ${id}` });
// })


// // query params
// server.get(`/teste`, (req, res) => {
//   const nome = req.query.nome;
//   // return res.send(`Hello word`); teste inicial
//   return res.json({ message: `Hello ${nome}` });
// });