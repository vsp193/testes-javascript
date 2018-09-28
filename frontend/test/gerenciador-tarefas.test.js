import GerenciadorTarefas from '../src/gerenciador-tarefas';
import $ from 'jquery';

describe('GerenciadorTarefas', () => {
  var gerenciador;

  beforeAll(() => gerenciador = new GerenciadorTarefas());

  describe('imprimirBemVindo', () => {
    test('deve imprimir texto de boas-vindas na div esperada', () => {
      document.body.innerHTML = `<h2 id='boas-vindas'></h2>`;

      gerenciador.imprimirBemVindo();
      var textoDiv = $('#boas-vindas').text();

      expect(textoDiv).toBe('Seja bem-vindo ao Gerenciador de Tarefas, Mackenzie!');
    });
  });

  describe('recarregarTarefas', () => {
    test('deve inserir tarefas carregadas do servidor', () => {
      document.body.innerHTML = `<ul id='lista-tarefas'></ul>`;
      $.get.mockImplementation(() => {
        Promise.resolve({ data: [
          {id: 1, titulo: 'Tarefa 1', foiFeito: false},
          {id: 2, titulo: 'Tarefa 2', foiFeito: false}
        ] })
      });

      gerenciador.recarregarTarefas();

      expect($('#lista-tarefas #tarefa-1 span').text()).toBe('Tarefa 1');
      expect($('#lista-tarefas #tarefa-1 span').text()).toBe('Tarefa 2');
    });
  });

  test('criarElementoTarefa deve retornar HTML corretamente preenchido', () => {
    const tarefa = { id: 1,  }
  });
});
