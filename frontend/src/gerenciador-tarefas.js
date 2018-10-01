import $ from 'jquery';

export default class GerenciadorTarefas {
  constructor() {
    this.elementoBotaoAdicionarTarefa = '#adicionar-tarefa';
    this.elementoAdicaoTituloTarefa = '#titulo-tarefa';
    this.elementoBoasVindas = '#boas-vindas';
    this.elementoListaTarefas = '#lista-tarefas';
    this.elementoMensagemErro = '#mensagem-erro';
  }

  inicializar() {
    this.imprimirBemVindo();
    this.recarregarTarefas();
    this.atribuirBindAElementos();
  }

  atribuirBindAElementos() {
    $(this.elementoBotaoAdicionarTarefa).click(() => this.adicionarTarefa());
    $('li input').click(() => this.atualizarTarefa());
  }

  imprimirBemVindo() {
    $(this.elementoBoasVindas).text('Seja bem-vindo ao Gerenciador de Tarefas!');
  }

  recarregarTarefas() {
    $(this.elementoListaTarefas).empty();

    return $.get('http://localhost:3000/tarefa')
      .then(data => this.imprimirTarefas(data));
  }

  imprimirTarefas(tarefas) {
    this.limparCampoAdicaoTarefa();

    tarefas.forEach(tarefa => {
      $(this.elementoListaTarefas).append(this.criarElementoTarefa(tarefa));
    });
  }

  limparCampoAdicaoTarefa() {
    $(this.elementoAdicaoTituloTarefa).val('');
  }

  criarElementoTarefa(tarefa) {
    return `
      <li id='tarefa-${tarefa.id}'>
        <span>${tarefa.titulo}</span>
        <input type='checkbox' value='${tarefa.id}' ${this.tarefaFoiFeita(tarefa)}/>
      </li>
    `;
  }

  tarefaFoiFeita(tarefa) {
    if (tarefa.foiFeita) return 'checked';
    else return '';
  }

  adicionarTarefa() {
    const tituloNovaTarefa = $(this.elementoAdicaoTituloTarefa).val();

    if (tituloNovaTarefa === '') return;

    return $.post('http://localhost:3000/tarefa', { titulo: tituloNovaTarefa })
      .then(() => this.recarregarTarefas());
  }
}
