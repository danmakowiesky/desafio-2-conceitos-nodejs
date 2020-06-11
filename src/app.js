const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (req, res) => {
  return res.status(200).json(repositories);
});

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body;
  const id = uuid();
  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories.push(repository);

  return res.status(201).json(repository);
});

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params;
  const { title, url, techs } = req.body;

  const findIndexinRepositories = repositories.findIndex((repository) => repository.id === id);

  if (findIndexinRepositories < 0) {
    return res.status(400).json({ error: 'Repository not found.' });
  }

  const respository = {
    id,
    title,
    url,
    techs,
    likes : repositories[findIndexinRepositories].likes,
  };

  repositories[findIndexinRepositories] = respository;

  return res.status(200).json(respository);
});

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;

  const findIndexinRepositories = repositories.findIndex((repository) => repository.id === id);

  if (findIndexinRepositories < 0) {
    return res.status(400).json({ error: 'Repository not found.' });
  }

  repositories.splice(findIndexinRepositories, 1);

  return res.status(204).send();
});

app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return res.status(400).json({ error: 'Repository not found.' });
  }

  repository.likes += 1;

  return res.status(200).json(repository);
});

module.exports = app;