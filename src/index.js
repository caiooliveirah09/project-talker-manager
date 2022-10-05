const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const fs = require('fs').promises;

const talker = 'src/talker.json';

app.use(express.json());

const Str = require('@supercharge/strings');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

// 01
app.get('/talker', async (req, res) => {
  const data = JSON.parse(await fs.readFile(talker, 'utf-8'));
  return res.status(200).json(data);
});

// 02
app.get('/talker/:id', async (req, res) => {
  const data = JSON.parse(await fs.readFile(talker, 'utf-8'));
  const { id } = req.params;
  const newData = data.find((people) => people.id === Number(id));
  console.log(newData);
  if (!newData) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(newData);
});

// 03, 04

function validateEmail(email) {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  if (!validateEmail(email)) {
    return res.status(400)
  .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  const token = Str.random(16);
  console.log(token);
  return res.status(200).json({ token });
});
