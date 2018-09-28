import express from 'express';

let router = express.Router();

import Tarefa from './Tarefa';

var idCounter = 3;

var tarefas = [
  new Tarefa(1, 'Lavar louça'),
  new Tarefa(2, 'Organizar quarto'),
  new Tarefa(3, 'Fazer palestra de Jest')
];

router.get('/tarefa', (req, res, next) => {
  res.json(tarefas);
});

router.post('/tarefa', (req, res) => {
  let tarefa = new Tarefa(gerarId(), req.body.titulo);
  tarefas.push(tarefa);
  res.status(201);
  res.send();
});

router.put('/tarefa', (req, res) => {
  var indexTarefa = retornarIndexTarefa(req.body.id);
  tarefas[indexTarefa] = req.body;
  res.json(tarefas[indexTarefa]);
});

router.delete('/tarefa', (req, res) => {
  var indexTarefa = retornarIndexTarefa(req.body.id);
  tarefas.splice(indexTarefa, 1);
  res.status(202);
  res.send();
});

const gerarId = () => {
  idCounter += 1;
  return idCounter;
}

const retornarIndexTarefa = idTarefaParaEncontrar => {
  return tarefas.findIndex(tarefa => tarefa.id == idTarefaParaEncontrar);
};

export default router;
