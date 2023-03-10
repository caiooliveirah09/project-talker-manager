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

const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateData = require('./middlewares/validateData');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');
const { writeFile } = require('./utils/fs');
const { readFile } = require('./utils/fs');

// 08

app.get('/talker/search', validateToken, async (req, res) => {
  const query = req.query.q;
  const data = await readFile();
  if (!query) return res.status(200).json(data);
  const find = data.filter((d) => d.name.includes(query));
  return res.status(200).json(find);
});

// 01

app.get('/talker', async (req, res) => {
  const data = await readFile();
  return res.status(HTTP_OK_STATUS).json(data);
});

// 02
app.get('/talker/:id', async (req, res) => {
  const data = JSON.parse(await fs.readFile(talker, 'utf-8'));
  const { id } = req.params;
  const newData = data.find((people) => people.id === Number(id));
  if (!newData) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(newData);
});

// 03, 04
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = Str.random(16);
  return res.status(HTTP_OK_STATUS).json({ token });
});

// 05

app.post('/talker', validateToken, validateName,
validateAge, validateTalk,
validateData, validateRate, async (req, res) => {
  const newPeople = req.body;
  const newPeopleWithId = await writeFile(newPeople);
  return res.status(201).json(newPeopleWithId);
});

// 06

app.put('/talker/:id', validateToken, validateName,
validateAge, validateTalk, validateData, validateRate, async (req, res) => {
  const { id } = req.params;
  const people = req.body;
  const newPeople = { id: Number(id), ...people };
  const data = await readFile();
  console.log(data);
  const index = data.findIndex((p) => p.id === Number(id));
  console.log(index);
  data[index] = newPeople;
  await fs.writeFile(talker, JSON.stringify(data));
  return res.status(200).json(data[index]);
});

// 07

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const data = await readFile();
  const newData = data.filter((i) => i.id !== Number(id));
  await fs.writeFile(talker, JSON.stringify(newData));
  return res.status(204).json(newData);
});