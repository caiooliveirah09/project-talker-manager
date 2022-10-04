const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const fs = require('fs').promises;

const talker = 'src/talker.json';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const data = JSON.parse(await fs.readFile(talker, 'utf-8'));
  return res.status(200).json(data);
});

app.get('/talker/:id', async (req, res) => {
  const data = JSON.parse(await fs.readFile(talker, 'utf-8'));
  const { id } = req.params;
  const newData = data.find((people) => people.id === Number(id));
  console.log(newData);
  if (!newData) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(newData);
});