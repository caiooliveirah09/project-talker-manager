const fs = require('fs').promises;
const { resolve } = require('path');

const talker = '../talker.json';
const path = resolve(__dirname, talker);

async function readFile() {
  const data = JSON.parse(await fs.readFile(path, 'utf-8'));
  return data;
}

async function writeFile(newPeople) {
  const oldPeoples = await readFile();
  const newPeopleWithId = { id: oldPeoples.length + 1, ...newPeople };
  const allPeoples = JSON.stringify([...oldPeoples, newPeopleWithId]);
  await fs.writeFile(path, allPeoples);
  return newPeopleWithId;
}

module.exports = {
  writeFile,
  readFile,
};