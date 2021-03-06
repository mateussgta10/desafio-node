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

  const index = repositories.findIndex((repository) => 
  repository.id === id);

  if(index === -1) {
    return res.status(400).json({error: 'respository not found'});
  }
    const repository = {
      id,
      title,
      url,
      techs,
      likes: repositories[index].likes,
    };
      
    repositories[index] = repository
      
    return res.json(repository);
});




app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params;

  const index = repositories.findIndex((repository) => 
    repository.id === id);

  if (index >= 0) {
    repositories.splice(index, 1);
  } else {
    return res.status(400).json({error: 'Repository not found'});
  }

  return res.status(204).send();
});



app.post('/repositories/:id/like', (req, res) => {
  const { id } = req.params;

  const index = repositories.findIndex((repository) => 
  repository.id === id);

  if (index === -1) {
    return res.status(400).json({ error: 'Repository not found' });
  }

  repositories[index].likes++;

  return res.status(200).json(repositories[index]);
});

module.exports = app;
