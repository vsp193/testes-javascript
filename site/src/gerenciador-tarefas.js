import $ from 'jquery';

export default class {
  constructor() {
    this.listaTarefas = [
      { id: 1, titulo: 'Lavar a louça', foiFeita: false, lembrete: null },
      { id: 2, titulo: 'Arrumar livros', foiFeita: false, lembrete: null },
      { id: 3, titulo: 'Pagar boleto', foiFeita: true, lembrete: null }
    ];
  }  

  carregarTarefas() {
    const elementoListaTarefas = $('#lista-tarefas');

    elementoListaTarefas.html('');

    this.listaTarefas.forEach(tarefa => {
      elementoListaTarefas.append(criarElementoTarefa(tarefa));
    });
  };

  adicionarTarefa() {
    const elementoTituloTarefa = $('#titulo-tarefa');
    inserirTarefaNaListagem(elementoTituloTarefa.value);
  };

  criarElementoTarefa(tarefa) {
    return `
    <li>
      <span>${tarefa.titulo}</span>
      <input type='checkbox' ${tarefaFoiFeita(tarefa)}/>
    </li>
  `;
  }

  tarefaFoiFeita(tarefa) {
    if (tarefa.foiFeita) return 'checked';
    else return '';
  }

  inserirTarefaNaListagem(titulo) {
    const novaTarefa = {
      id: gerarNovoId(),
      titulo: titulo,
      foiFeita: false,
      lembrete: null
    };

    this.listaTarefas.push(novaTarefa);
  }

  gerarNovoId() {
    const indexUltimaTarefa = this.listaTarefas.length - 1;
    return this.listaTarefas[indexUltimaTarefa].id++;
  }
}
