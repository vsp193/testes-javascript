var jquery = require('jquery');

var gerenciadorTarefas = new function() {
  this.listaTarefas = [
    { id: 1, titulo: 'Lavar a louça', foiFeita: false, lembrete: null },
    { id: 2, titulo: 'Arrumar livros', foiFeita: false, lembrete: null },
    { id: 3 ,titulo: 'Pagar boleto', foiFeita: true, lembrete: null }
  ];

  this.carregarTarefas = function() {
    const elementoListaTarefas = jquery('#lista-tarefas');

    // Limpa lista no carregamento
    elementoListaTarefas.html('');

    // Itera sobre a lista de tarefas para carregar informações
    this.listaTarefas.forEach(tarefa => {
      // Adiciona um elemento 
      elementoListaTarefas.append(criarElementoTarefa(tarefa));
    });
  };

  this.adicionarTarefa = function() {
    const elementoTituloTarefa = jquery('#titulo-tarefa');
    inserirTarefaNaListagem(elementoTituloTarefa.val());
  };

  function criarElementoTarefa(tarefa) {
    return `
      <li>
        <span>${tarefa.titulo}</span>
        <input type='checkbox' ${tarefaFoiFeita(tarefa)}/>
      </li>
    `;
  }

  function tarefaFoiFeita(tarefa) {
    if (tarefa.foiFeita) return 'checked';
    else return '';
  }

  function inserirTarefaNaListagem(titulo) {
    const novaTarefa = {
      id: gerarNovoId().bind(this),
      titulo: titulo,
      foiFeita: false,
      lembrete: null
    };

    this.listaTarefas.push(novaTarefa);
  }

  function gerarNovoId() {
    const indexUltimaTarefa = this.listaTarefas.length - 1;
    return this.listaTarefas[indexUltimaTarefa].id++;
  }
}

// Faz carregamento inicial na página
jquery(function() {
  gerenciadorTarefas.carregarTarefas();

  jquery('#adicionar-tarefa').click(gerenciadorTarefas.adicionarTarefa.bind(this));
});
