import $ from 'jquery';

export default class GerenciadorTarefas {
  inicializar() {
    this.imprimirBemVindo();
    this.recarregarTarefas();

    $('#adicionar-tarefa').click(() => this.adicionarTarefa());
  }

  imprimirBemVindo() {
    $('#boas-vindas').text('Seja bem-vindo ao Gerenciador de Tarefas, Mackenzie!');
  }

  recarregarTarefas() {
    const elementoListaTarefas = $('#lista-tarefas');
    elementoListaTarefas.html('');

    $.get('http://localhost:3000/tarefa', data => {
      data.forEach(tarefa => {
        elementoListaTarefas.append(this.criarElementoTarefa(tarefa));
      });
    });
  };

  adicionarTarefa() {
    const tituloNovaTarefa = $('#titulo-tarefa').val();

    $.post(
      'http://localhost:3000/tarefa',
      { titulo: tituloNovaTarefa },
      () => this.recarregarTarefas()
    );
  };

  criarElementoTarefa(tarefa) {
    return `
      <li id='tarefa-${tarefa.id}'>
        <span>${tarefa.titulo}</span>
        <input type='checkbox' ${this.tarefaFoiFeita(tarefa)}/>
      </li>
    `;
  }

  tarefaFoiFeita(tarefa) {
    if (tarefa.foiFeita) return 'checked';
    else return '';
  }
}
