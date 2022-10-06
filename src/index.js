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

const { readFile } = require('./utils/fs');

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

const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateData = require('./middlewares/validateData');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');
const { writeFile } = require('./utils/fs');

app.post('/talker', validateToken, validateName,
validateAge, validateTalk,
validateData, validateRate, async (req, res) => {
  const newPeople = req.body;
  const newPeopleWithId = await writeFile(newPeople);
  return res.status(201).json(newPeopleWithId);
});